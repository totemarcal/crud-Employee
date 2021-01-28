import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteEmployeeModal from "./deleteEmployeeModal";
import EmployeeService from "../services/EmployeeService";

const App = (props) => {

  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false)
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false)
  const [isDeleteEmployeeModalOpen, setIsDeleteEmployeeModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(false)

  useEffect(() => {
    getData();
  },[])

  
  const getData = () => {
    setErrorMessage("")
    setLoading(true);
    EmployeeService.getAll()
      .then(res => {
        console.log(res.data)
        setEmployee(res.data)
        setErrorMessage("")
        setLoading(false);
        })
      .catch(() => 
      {setErrorMessage("Network Error. Please try again.")
      setLoading(false)}
      )
  }

  const toggleAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(!isAddEmployeeModalOpen)
  }

  const toggleEditEmployeeModal = () => {
    setIsEditEmployeeModalOpen(!isEditEmployeeModalOpen)
  }

  const toggleDeleteEmployeeModal = () => {
    setIsDeleteEmployeeModalOpen(!isDeleteEmployeeModalOpen)
  }

  const addEmployee = (data) => {
    setEmployee([data, ...employee])
  }

  const updateEmployee = (data) => {
    setEmployee(employee.map(emp => emp.id == data.id ? data : emp) )
  }

  const deleteEmployee = employeeId => {
    setEmployee(employee.filter(emp => emp.id !== employeeId))
  }

    return (
      <ScrollView>

        <View style={styles.container}>
          <TouchableOpacity
            onPress={toggleAddEmployeeModal}
            style={styles.button}>
            <Text style={styles.buttonText}>Add employee</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Employee Lists:</Text>
          {employee.map((data, index) => 
            <View
            style={styles.employeeListContainer}
            key={data.id}>
            <Text style={{ ...styles.listItem, color: "tomato" }}>{index + 1}.</Text>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.listItem}>employee age: {data.age}</Text>
            <Text style={styles.listItem}>employee salary: {data.salary}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  toggleEditEmployeeModal();
                  setSelectedEmployee(data)
                }}
                style={{ ...styles.button, marginVertical: 0 }}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  toggleDeleteEmployeeModal();
                  setSelectedEmployee(data)
                }}
                style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>)}

          {loading ? <Text
            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
              style={styles.message}>{errorMessage}</Text> : null}

          {/* AddEmployeeModal modal is open when add employee button is clicked */}
          {isAddEmployeeModalOpen ? <AddEmployeeModal
            isOpen={isAddEmployeeModalOpen}
            closeModal={toggleAddEmployeeModal}
            addEmployee={addEmployee}
          /> : null}

          {/* EditEmployeeModal modal is open when edit button is clicked in particular employee list*/}
          {isEditEmployeeModalOpen ? <EditEmployeeModal
            isOpen={isEditEmployeeModalOpen}
            closeModal={toggleEditEmployeeModal}
            selectedEmployee={selectedEmployee}
            updateEmployee={updateEmployee}
          /> : null}

          {/* DeleteEmployeeModal modal is open when delete button is clicked in particular employee list*/}
          {isDeleteEmployeeModalOpen ? <DeleteEmployeeModal
            isOpen={isDeleteEmployeeModalOpen}
            closeModal={toggleDeleteEmployeeModal}
            selectedEmployee={selectedEmployee}
            updateEmployee={deleteEmployee}
          /> : null}
        </View>

      </ScrollView>
    );
  
}

export default App;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  employeeListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  name: {
    fontWeight: "bold",
    fontSize: 16
  },
  listItem: {
    fontSize: 16
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  message: {
    color: "tomato",
    fontSize: 17
  }
})