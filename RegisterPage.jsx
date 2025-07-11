import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import styles from "./Style";
import { API_URL } from '@env';
import axios from "axios";

const RegisterPage = ({ navigation }) => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    userPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    let errorMsg = "";

    switch (fieldName) {
      case "userName":
        if (value.trim() === "") errorMsg = "Full Name is required";
        break;
      case "userEmail":
        if (!/^\S+@\S+\.\S+$/.test(value)) errorMsg = "Invalid email address";
        break;
      case "userMobile":
        if (value.length < 10) errorMsg = "Mobile number must be at least 10 digits";
        break;
      case "userPassword":
        if (value.length < 6) errorMsg = "Password must be at least 6 characters";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMsg,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    const validationRules = {
      userName: {
        condition: !formData.userName.trim(),
        message: "Full Name is required",
      },
      userEmail: {
        condition: !/^\S+@\S+\.\S+$/.test(formData.userEmail),
        message: "Invalid email address",
      },
      userMobile: {
        condition: formData.userMobile.length < 10,
        message: "Mobile number must be at least 10 digits",
      },
      userPassword: {
        condition: formData.userPassword.length < 6,
        message: "Password must be at least 6 characters",
      },
    };

    Object.keys(validationRules).forEach((field) => {
      if (validationRules[field].condition) {
        newErrors[field] = validationRules[field].message;
      }
    });

    setErrors(newErrors);
    // Agar koi error hai to request bhejne se rok do
    if (Object.keys(newErrors).length > 0) {
    return false;
    }

    return true;
  };

  const handleInputChange = (fieldName, newValue) => {
    setFormData((currData) => ({
      ...currData,
      [fieldName]: newValue,
    }));
    validateField(fieldName, newValue);
  };

  
  const handleSubmit = () => {
    
    if (!formData.userName || !formData.userEmail || !formData.userMobile || !formData.userPassword) {
      alert("All fields are mandatory.");
      return;
    }
  
    if (!validateForm()) {
      return;
    }
  
    const userData = {
      name: formData.userName,
      email: formData.userEmail,
      mobile: formData.userMobile,
      password: formData.userPassword,
    };
  
    axios
      .post(`${API_URL}/auth/register`, userData)
      .then((res) => {
        if (res.data.status === "ok") {
          alert("Registration Successful!");
          
          
          setFormData({
            userName: "",
            userEmail: "",
            userMobile: "",
            userPassword: "",
          });
        
         navigation.navigate("Login");
           
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          alert("User already exists! Please use a different email.");
        } else {
          alert("Something went wrong. Please try again.");
        }
        console.log("Error:", e);
      });
  };
  

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../../assets/register.jpg")} />
          </View>

          {/* Register Form Section */}
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Register</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#5F6F65", textAlign: "center", marginBottom: 20 }}>
              Create your new account
            </Text>

            {/* Full Name Input */}
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#2d6a4f" style={styles.icon} />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="gray"
                style={styles.textInput}
                value={formData.userName}
                onChangeText={(text) => handleInputChange("userName", text)}
              />
              {formData.userName !== "" || errors.userName ? (
                <Feather name="check-circle" size={20} color={errors.userName ? "red" : "green"} />
              ) : null}
            </View>
            {errors.userName && <Text style={{ color: "red" }}>{errors.userName}</Text>}

            {/* Email Input */}
            <View style={styles.action}>
              <FontAwesome name="envelope-o" color="#2d6a4f" style={styles.icon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                style={styles.textInput}
                value={formData.userEmail}
                onChangeText={(text) => handleInputChange("userEmail", text)}
              />
              {formData.userEmail !== "" || errors.userEmail ? (
                <Feather name="check-circle" size={20} color={errors.userEmail ? "red" : "green"} />
              ) : null}
            </View>
            {errors.userEmail && <Text style={{ color: "red" }}>{errors.userEmail}</Text>}

            {/* Mobile Number Input */}
            <View style={styles.action}>
              <FontAwesome name="mobile" color="#2d6a4f" style={styles.icon} />
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor="gray"
                style={styles.textInput}
                value={formData.userMobile}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("userMobile", text)}
              />
              {formData.userMobile !== "" || errors.userMobile ? (
                <Feather name="check-circle" size={20} color={errors.userMobile ? "red" : "green"} />
              ) : null}
            </View>
            {errors.userMobile && <Text style={{ color: "red" }}>{errors.userMobile}</Text>}

            {/* Password Input */}
            <View style={styles.action}>
              <FontAwesome name="lock" color="#2d6a4f" style={styles.icon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                style={styles.textInput}
                secureTextEntry
                value={formData.userPassword}
                onChangeText={(text) => handleInputChange("userPassword", text)}
              />
              {formData.userPassword !== "" || errors.userPassword ? (
                <Feather name="check-circle" size={20} color={errors.userPassword ? "red" : "green"} />
              ) : null}
            </View>
            {errors.userPassword && <Text style={{ color: "red" }}>{errors.userPassword}</Text>}

            {/* Register Button */}
            <TouchableOpacity style={styles.loginButton} onPress={() => {
                     console.log("Register Button Pressed");
                          if (validateForm()) {
                                 handleSubmit();
                             }
                   }}>
              <Text style={styles.textSign}>Register</Text>
            </TouchableOpacity>

            {/* Already have an account? Sign In */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15 }}>
              <Text style={{ color: "#5F6F65", fontSize: 16 }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#3F7D58", fontSize: 16, fontWeight: "bold" }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterPage;
