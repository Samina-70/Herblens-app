import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import styles from "./Style";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    emailOrMobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [secureText, setSecureText] = useState(true); 

  const togglePasswordVisibility = () => {
    setSecureText(!secureText);
  };

  const validateField = (field, value) => {
    let errorMsg = "";

    if (field === "emailOrMobile") {
      if (!value.trim()) {
        errorMsg = "Mobile or Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(value) && isNaN(value)) {
        errorMsg = "Enter a valid email or mobile number";
      }
    }

    if (field === "password") {
      if (value.length < 6) {
        errorMsg = "Password must be at least 6 characters";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    return !errorMsg;
  };

  const validateForm = () => {
    const isInputValid = validateField("emailOrMobile", loginData.emailOrMobile);
    const isPasswordValid = validateField("password", loginData.password);
    return isInputValid && isPasswordValid;
  };

  const handleSubmit = async () => {
    if (!loginData.emailOrMobile || !loginData.password) {
      Alert.alert("Validation Error", "All fields are mandatory.");
      return;
    }

    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fix the errors before submitting.");
      return;
    }

    const payload = {
      email: loginData.emailOrMobile,
      password: loginData.password,
    };

    try {
      const res = await axios.post(`${API_URL}/auth/login`, payload);

      if (res.data.status === "ok") {
        Alert.alert("Logged In Successfully");
        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        navigation.navigate("HomeScreen");
        setLoginData({ emailOrMobile: "", password: "" });
      } else {
        Alert.alert("Login Failed", res.data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Login</Text>
            <Text style={styles.subHeader}>Login to your account</Text>

            {/* Email / Mobile Input */}
            <View style={styles.action}>
              <FontAwesome name="user-o" size={20} color="#2d6a4f" style={styles.icon} />
              <TextInput
                placeholder="Mobile or Email"
                placeholderTextColor="gray"
                style={styles.textInput}
                value={loginData.emailOrMobile}
                onChangeText={(text) => {
                  setLoginData({ ...loginData, emailOrMobile: text });
                  validateField("emailOrMobile", text);
                }}
              />
              {loginData.emailOrMobile !== "" && (
                <Feather
                  name="check-circle"
                  size={20}
                  color={errors.emailOrMobile ? "red" : "green"}
                />
              )}
            </View>
            {errors.emailOrMobile && <Text style={styles.errorText}>{errors.emailOrMobile}</Text>}

            {/* Password Input with Toggle */}
            <View style={styles.action}>
              <FontAwesome name="lock" size={20} color="#2d6a4f" style={styles.icon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                style={styles.textInput}
                secureTextEntry={secureText}
                value={loginData.password}
                onChangeText={(text) => {
                  setLoginData({ ...loginData, password: text });
                  validateField("password", text);
                }}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Feather
                  name={secureText ? "eye-off" : "eye"}
                  size={20}
                  color="gray"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.textSign}>Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.separator}>---- Or Continue as ----</Text>

          <View style={styles.bottomButton}>
            {[
              { label: "Admin", icon: "user-circle-o" },
              { label: "Sign Up", icon: "user-plus", action: () => navigation.navigate("Register") },
              { label: "Google", icon: "google" },
              { label: "Facebook", icon: "facebook" },
            ].map((item, idx) => (
              <View key={idx} style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                  style={styles.inBut2}
                  onPress={item.action || (() => {})}
                >
                  <FontAwesome name={item.icon} size={20} color="white" style={styles.smallIcon2} />
                </TouchableOpacity>
                <Text style={styles.bottomText}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.authContainer}>
            <Text style={styles.authText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.authButton}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
