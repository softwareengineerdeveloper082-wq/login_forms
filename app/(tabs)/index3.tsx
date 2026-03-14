import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// ---------------- Firebase Config ----------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY  ",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ---------------- Main App ----------------
const App: React.FC = () => {
  // ---------- State ----------
  const [screen, setScreen] = useState<"login" | "register" | "profile" | "mood">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>("");

  const moods = ["😊 Happy", "😐 Neutral", "😞 Sad", "😰 Stressed"];

  // ---------- Registration ----------
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser({ name, email: userCredential.user.email ?? "" });
      Alert.alert("Success", "Registration Successful");
      setScreen("profile");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // ---------- Login ----------
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser({ name: "Student", email: userCredential.user.email ?? "" });
      setScreen("profile");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // ---------- Logout ----------
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setEmail("");
    setPassword("");
    setScreen("login");
  };

  // ---------- Save Mood ----------
  const saveMood = async () => {
    if (!selectedMood) {
      Alert.alert("Select a mood first!");
      return;
    }
    try {
      await addDoc(collection(db, "moods"), {
        email: user?.email,
        mood: selectedMood,
        timestamp: serverTimestamp(),
      });
      Alert.alert("Mood saved successfully!");
      setSelectedMood("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // ---------------- Screens ----------------

  // Registration Screen
  if (screen === "register") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Student Registration</Text>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("login")}>
          <Text style={{ marginTop: 20, color: "blue" }}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Login Screen
  if (screen === "login") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Student Login</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("register")}>
          <Text style={{ marginTop: 20, color: "blue" }}>Register Here</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Profile Screen
  if (screen === "profile") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Student Profile</Text>
        <Text style={styles.data}>Name: {user?.name}</Text>
        <Text style={styles.data}>Email: {user?.email}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setScreen("mood")}>
          <Text style={styles.buttonText}>Go to Mood Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Mood Tracker Screen
  if (screen === "mood") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mood Tracker</Text>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[styles.moodButton, selectedMood === mood && { backgroundColor: "#4CAF50" }]}
            onPress={() => setSelectedMood(mood)}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={saveMood}>
          <Text style={styles.buttonText}>Save Mood</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen("profile")}>
          <Text style={styles.buttonText}>Back to Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  input: { backgroundColor: "#fff", padding: 12, marginBottom: 15, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 18 },
  data: { fontSize: 18, marginBottom: 15 },
  moodButton: { padding: 15, marginBottom: 10, borderRadius: 8, backgroundColor: "#ccc" },
  moodText: { fontSize: 18, textAlign: "center" },
});

export default App;

