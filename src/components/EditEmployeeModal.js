import React, { useState, useEffect } from 'react';
import EmployeeService from "../services/EmployeeService";
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const EditEmployeeModal = (props) => {
    const initialEmployeeState = {
        name: "",
        age: "",
        salary: ""
      };

    const [employee, setEmployee] = useState(initialEmployeeState);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { isOpen, closeModal } = props;

    useEffect(() => {
        // state value is updated by selected employee data
        const data = {
            name: props.selectedEmployee.name,
            age: props.selectedEmployee.age,
            salary: props.selectedEmployee.salary
          };
        setEmployee(data)
    }, [])

    const handleChange = (value, name) => {
        setEmployee({ ...employee, [name]: value });
    }

    const updateEmployee = () => {
        // destructure state
        
        setErrorMessage("")
        setLoading(true);

        if (employee.name && employee.age && employee.salary) {
            // selected employee is updated with employee id
            const id = props.selectedEmployee.id;
            const data = {
                name: employee.name,
                salary: employee.salary,
                age: employee.age
            }
            EmployeeService.update(id, data)
                .then(res => {
                    props.closeModal();
                    props.updateEmployee({
                        name: res.data.name,
                        age: res.data.age,
                        salary: res.data.salary,
                        id: props.selectedEmployee.id
                    });
                })
                .catch(() => {
                    setErrorMessage("Network Error. Please try again.")
                    setLoading(false)
                })
        } else {
            setErrorMessage("Fields are empty.")
            setLoading(false)
        }
    }

    return (
        <Modal
            visible={isOpen}
            onRequestClose={closeModal}
            animationType="slide"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Update Employee</Text>

                <TextInput
                    value={employee.name}
                    style={styles.textBox}
                    onChangeText={(text) => handleChange(text, "name")}
                    placeholder="Full Name" />

                <TextInput
                    defaultValue={employee.salary}
                    keyboardType="numeric"
                    style={styles.textBox}
                    onChangeText={(text) => handleChange(text, "salary")}
                    placeholder="salary" />
                <TextInput
                    defaultValue={employee.age}
                    keyboardType="numeric"
                    style={styles.textBox}
                    onChangeText={(text) => handleChange(text, "age")}
                    placeholder="Age" />

                {loading ? <Text
                    style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                        style={styles.message}>{errorMessage}</Text> : null}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={updateEmployee}
                        style={{ ...styles.button, marginVertical: 0 }}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={closeModal}
                        style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
    
}



export default EditEmployeeModal;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
})