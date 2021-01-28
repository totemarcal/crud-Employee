import React, { useState } from 'react';
import EmployeeService from "../services/EmployeeService";
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const AddEmployeeModal = (props) => {
    const initialEmployeeState = {
        name: "",
        age: "",
        salary: ""
      };

    const [employee, setEmployee] = useState(initialEmployeeState);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { isOpen, closeModal } = props;

    const handleChange = (value, name) => {
        setEmployee({ ...employee, [name]: value });
    }

    const addEmployee = () => {
        
        setErrorMessage("")
        setLoading(true);

        if (employee.name && employee.age && employee.salary) {
            const data = {
                name: employee.name,
                salary: employee.salary,
                age: employee.age
            }
            EmployeeService.create(data)
                .then(res => {
                    props.closeModal();
                    props.addEmployee({
                        name: res.data.name,
                        age: res.data.age,
                        salary: res.data.salary,
                        id: res.data.id
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
                    <Text style={styles.title}>Add New Employee</Text>

                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => handleChange(text, "name")}
                        placeholder="Full Name" />

                    <TextInput
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => handleChange(text, "salary")}
                        placeholder="salary" />
                    <TextInput
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => handleChange(text, "age")}
                        placeholder="Age" />

                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={addEmployee}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Submit</Text>
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



export default AddEmployeeModal;

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