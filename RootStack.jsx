import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from './HomeScreen';
import LocationScreen from './Location';
import ScanScreen from './ScanHerbs';
import MenuButton from '../Components/MenuButton';
import LoginPage from './LoginRegister/LoginPage';
import RegisterPage from './LoginRegister/RegisterPage';
import ProfileScreen from './Profile.jsx';
import SearchHerbsScreen from './SearchHerbsScreen.jsx';
const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
        const checkLoginStatus = async () => {
          try {
            const token = await AsyncStorage.getItem("token");
            setIsLoggedIn(!!token);
            // setIsLoggedIn(true);
          } catch (error) {
            console.error("Error checking login status:", error);
          }
          setIsLoading(false);
        };
    
        checkLoginStatus();
      }, []);
    
      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#2d6a4f" />
          </View>
        );
      }
    return (
        <Stack.Navigator
    initialRouteName={isLoggedIn ? "HomeScreen" : "Login"}
    screenOptions={{
        headerStyle: { backgroundColor: "#2d6a4f" },
        headerTintColor: "white",
        headerTitleAlign: "center",
    }}
>  
    <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
    
    <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
            headerLeft: () => <MenuButton />,
        }} 
    />
    <Stack.Screen name="Location" component={LocationScreen} />
    <Stack.Screen name="ScanHerbs" component={ScanScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name='ExploreHerbs' component={SearchHerbsScreen}/>
  </Stack.Navigator>

    );
};

export default RootStack;