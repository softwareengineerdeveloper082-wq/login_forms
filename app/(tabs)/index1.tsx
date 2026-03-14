import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

export default function App() {

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if(studentId === "" || password === ""){
      alert("Please fill all fields");
    } else {
      alert("Student Login Successful");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Student Email or ID"
        value={studentId}
        onChangeText={setStudentId}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f2f2f2"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40
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
  }
});