import React, { useState } from 'react';
import EmployeeService from "../services/EmployeeService";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const DeleteEmployeeModal = (props) => {
    const initialEmployeeState = {
        name: "",
        age: "",
        salary: ""
      };

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { isOpen, closeModal, selectedEmployee } = props;


    const deleteEmployee = () => {
        setErrorMessage("")
        setLoading(true);

        EmployeeService.remove(props.selectedEmployee.id)
            .then(res => {
                props.closeModal();
                props.updateEmployee(props.selectedEmployee.id);
            })
            .catch((err) => {
                setErrorMessage("Network Error. Please try again.")
                setLoading(false)            })
    }

        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
                transparent
            >
                <View style={styles.BackgroundContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>would you like to delete employee name ({selectedEmployee.name})?</Text>
                        <Text style={styles.subTitle}>If you are sure to delete this  employee then click Agree
                        button or if you are not willing to delete just click Disagree.</Text>

                        {loading ? <Text
                            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                                style={styles.message}>{errorMessage}</Text> : null}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={deleteEmployee}>
                                <Text style={styles.buttonText}>Agree</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginLeft: 10 }}
                                onPress={closeModal}>
                                <Text style={{ ...styles.buttonText, color: "skyblue" }}>Disagree</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    
}



export default DeleteEmployeeModal;

const styles = StyleSheet.create({
    BackgroundContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    container: {
        width: "90%",
        padding: 15,
        maxHeight: "40%",
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
        marginBottom: 5
    },
    subTitle: {
        fontSize: 16
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
        alignSelf: "flex-end"
    },
    buttonText: {
        color: "tomato",
        fontSize: 17
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
})