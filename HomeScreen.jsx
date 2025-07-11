import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Animated, BackHandler, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

const herbsData = [
  { id: "1", name: "Aloe Vera", image: require("../assets/aleovera.jpg") },
  { id: "2", name: "Neem", image: require("../assets/neem.jpg") },
  { id: "3", name: "Tulsi", image: require("../assets/tulsi.jpg") },
];

const funFacts = [
  "Aloe Vera helps heal burns faster!",
  "Tulsi is known as the 'Queen of Herbs' in Ayurveda!",
  "Neem leaves are used to purify blood naturally!",
];

const HomeScreen = ({ navigation }) => {
  const [animatedValue] = useState(new Animated.Value(0));

  // Define backAction outside useEffect to avoid ReferenceError
  const backAction = useCallback(() => {
    Alert.alert("Exit App", "Do you want to exit?", [
      { text: "Cancel", onPress: () => null, style: "cancel" },
      { text: "Exit", onPress: () => BackHandler.exitApp() },
    ]);
    return true; // Prevents default back action
  }, []);

  // Use `useFocusEffect` to add/remove BackHandler dynamically
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove("hardwareBackPress", backAction);
    }, [backAction])
  );

  // Animated Effect
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Toast.show({
      type: "success",
      text1: "Welcome to HerbsLens!",
      text2: "Discover amazing herbs 🌿",
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <Text style={styles.title}>🌿 Welcome to HerbsLens</Text>
      <Text style={styles.subtitle}>Discover the Power of Herbs!</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("ScanHerbs")}>
           <Ionicons name="camera-outline" size={20} color="white" style={styles.navIcon} />
           <Text style={styles.navButtonText}>Scan to Identify</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={()=>navigation.navigate("Location")}>
            <Ionicons name="location-outline" size={20} color="white" style={styles.navIcon} />
            <Text style={styles.navButtonText}>Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={()=>navigation.navigate("ExploreHerbs")}>
            <Ionicons name="search" size={20} color="white" style={styles.navIcon} />
            <Text style={styles.navButtonText}>Explore Herbs</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Herbs Section */}
      <Text style={styles.sectionTitle}>🌟 Featured Herbs</Text>
      <FlatList
        horizontal
        data={herbsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.herbCard}>
            <Image source={item.image} style={styles.herbImage} />
            <Text style={styles.herbName}>{item.name}</Text>

            {/* Fun Fact Below Each Herb */}
            <Text style={styles.funFact}>{funFacts[index % funFacts.length]}</Text>
          </View>
        )}
      />
     
      {/* Footer */}
      <Text style={styles.footer}>© 2025 HerbsLens | All Rights Reserved</Text>
    </View>
  );
};

// Updated Styles with Bigger Cards & Better Alignment
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1D8C3",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2d6a4f",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  navButton: {
    flexDirection: "row", 
    backgroundColor: "#2d6a4f",
    paddingVertical: 12,
    paddingHorizontal: 20, 
    borderRadius: 100,
    marginVertical: 8,
    width: "90%",
    height: 50, 
    justifyContent: "center", 
    alignItems: "center",
    elevation: 3, 
    shadowColor: "#000", 
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  
  navIcon: {
    marginRight: 8, 
  },
  
  navButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d6a4f",
    marginTop: 40,
    marginBottom: 10,
  },
  herbCard: {
    backgroundColor: "#e9f5db", 
    borderRadius: 12,
    padding: 10, 
    marginRight: 10, 
    alignItems: "center",
    elevation: 3, 
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 116,
    height: 240, 
  },
  herbImage: {
    width: 65, // Bigger Image
    height: 65,
    borderRadius: 40,
    marginBottom: 10,
  },
  herbName: {
    fontSize: 15, 
    fontWeight: "bold",
    color: "#2d6a4f",
    textAlign: "center",
    marginBottom: 20,
  },
  funFact: {
    fontSize: 13, 
    fontStyle: "italic",
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  footer: {
    fontSize: 12,
    color: "#555",
    marginTop: 30,
  },
});

export default HomeScreen;
