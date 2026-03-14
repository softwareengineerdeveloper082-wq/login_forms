import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {

  const [screen, setScreen] = useState("form");

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [department, setDepartment] = useState("");

  const submitForm = () => {
    if (name === "" || roll === "" || department === "") {
      alert("Please fill all fields");
      return;
    }

    setScreen("success");
  };

  // FORM SCREEN
  if (screen === "form") {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Student Form</Text>

        <TextInput
          style={styles.input}
          placeholder="Student Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Roll Number"
          value={roll}
          onChangeText={setRoll}
        />

        <TextInput
          style={styles.input}
          placeholder="Department"
          value={department}
          onChangeText={setDepartment}
        />

        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={styles.buttonText}>Submit Form</Text>
        </TouchableOpacity>

      </View>
    );
  }

  // SUCCESS SCREEN
  if (screen === "success") {
    return (
      <View style={styles.container}>

        <Text style={styles.success}>Form Submitted Successfully</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setScreen("print")}
        >
          <Text style={styles.buttonText}>Print Form</Text>
        </TouchableOpacity>

      </View>
    );
  }

  // PRINT SCREEN
  if (screen === "print") {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Student Form Details</Text>

        <Text style={styles.data}>Name: {name}</Text>
        <Text style={styles.data}>Roll No: {roll}</Text>
        <Text style={styles.data}>Department: {department}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Printing Form")}
        >
          <Text style={styles.buttonText}>Print</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f2f2f2"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc"
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18
  },

  success: {
    fontSize: 22,
    color: "green",
    textAlign: "center",
    marginBottom: 30
  },

  data: {
    fontSize: 18,
    marginBottom: 10
  }

});
