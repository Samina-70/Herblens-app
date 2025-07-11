// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import LottieView from "lottie-react-native";
// import MapboxGL from '@rnmapbox/maps';

// MapboxGL.setAccessToken('pk.eyJ1IjoiYXNhZDYwMCIsImEiOiJjbWFjc3JmcjEwNjNqMmxzYjJneHMwMDg4In0.Whd7oJEo4cNhrpNiBDzPyw');

// const LocationScreen = () => {
//   const [userLocation, setUserLocation] = useState("");
//   const [locationRequested, setLocationRequested] = useState(false);
//   const [locationUploaded, setLocationUploaded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const getUserLocation = async () => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//       Alert.alert("Permission Denied", "Location permission is required.");
//       return;
//     }

//     setLocationRequested(true);
//     if (locationUploaded) {
//       Alert.alert("Already Uploaded", "Your location has already been uploaded.");
//     } else {
//       Alert.alert("Location Ready", "Please upload your location.");
//     }
//   };

//   const handleUploadLocation = () => {
//     if (!locationRequested) {
//       Alert.alert("Not Ready", "Please refresh location first.");
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       const dummyLatitude = 24.8607;
//       const dummyLongitude = 67.0011;
//       const locationString = `Latitude: ${dummyLatitude.toFixed(4)}, Longitude: ${dummyLongitude.toFixed(4)}`;
//       setUserLocation(locationString);
//       setLocationUploaded(true);
//       setLoading(false);
//       Alert.alert("Success", "Your location has been successfully uploaded.");
//     }, 1500);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Loader Modal */}
//       <Modal transparent visible={loading}>
//         <View style={styles.loaderContainer}>
//           <LottieView
//             source={require("../assets/animations/square-loader.json")}
//             autoPlay
//             loop
//             style={{ width: 120, height: 120 }}
//           />
//           <Text style={{ color: "white", marginTop: 10 }}>Uploading...</Text>
//         </View>
//       </Modal>

//       {/* Header */}
//       <Text style={styles.title}>🌿Discover Nearby Herbs!</Text>
//       <Text style={styles.subtitle}>Get Suggestion Near You</Text>

//       {/* Location Display */}
//       <View style={styles.locationBox}>
//         <Ionicons name="location-outline" size={32} color="#2d6a4f" />
//         <Text style={styles.locationText}>
//           {userLocation
//             ? userLocation
//             : locationRequested
//             ? "Please upload your location"
//             : "Your location will appear here"}
//         </Text>
//       </View>

//       {/* Buttons */}
//       <TouchableOpacity style={styles.button} onPress={getUserLocation}>
//         <Ionicons name="refresh" size={22} color="white" />
//         <Text style={styles.buttonText}>Refresh Location</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.buttonSecondary} onPress={handleUploadLocation}>
//         <Ionicons name="cloud-upload-outline" size={22} color="#2d6a4f" />
//         <Text style={styles.buttonTextSecondary}>Upload Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#C1D8C3",
//     padding: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loaderContainer: {
//     flex: 1,
//     backgroundColor: "#000000aa",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#2d6a4f",
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 30,
//   },
//   locationBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E9F5DB",
//     padding: 20,
//     width: "90%",
//     minHeight: 200,
//     borderRadius: 10,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     marginBottom: 20,
//   },
//   locationText: {
//     fontSize: 16,
//     color: "#333",
//     marginLeft: 10,
//     flexShrink: 1,
//   },
//   button: {
//     flexDirection: "row",
//     backgroundColor: "#2d6a4f",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 100,
//     marginVertical: 10,
//     width: "90%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
//   buttonSecondary: {
//     flexDirection: "row",
//     backgroundColor: "#E9F5DB",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 100,
//     marginVertical: 10,
//     width: "90%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: "#2d6a4f",
//     borderWidth: 2,
//   },
//   buttonTextSecondary: {
//     color: "#2d6a4f",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
// });

// export default LocationScreen;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import LottieView from "lottie-react-native";
// import MapboxGL from "@rnmapbox/maps";

// MapboxGL.setAccessToken("pk.eyJ1IjoiYXNhZDYwMCIsImEiOiJjbWFjc3JmcjEwNjNqMmxzYjJneHMwMDg4In0.Whd7oJEo4cNhrpNiBDzPyw");

// const LocationScreen = () => {
//   const [coords, setCoords] = useState(null);
//   const [locationRequested, setLocationRequested] = useState(false);
//   const [locationUploaded, setLocationUploaded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const getUserLocation = async () => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//       Alert.alert("Permission Denied", "Location permission is required.");
//       return;
//     }

//     setLocationRequested(true);
//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCoords({ latitude, longitude });
//         setLoading(false);
//         Alert.alert("Location Ready", "Please upload your location.");
//       },
//       (error) => {
//         console.error(error);
//         setLoading(false);
//         Alert.alert("Error", "Failed to get location.");
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const handleUploadLocation = () => {
//     if (!locationRequested || !coords) {
//       Alert.alert("Not Ready", "Please refresh location first.");
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       setLocationUploaded(true);
//       setLoading(false);
//       Alert.alert("Success", "Your location has been successfully uploaded.");
//     }, 1500);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Loader Modal */}
//       <Modal transparent visible={loading}>
//         <View style={styles.loaderContainer}>
//           <LottieView
//             source={require("../assets/animations/square-loader.json")}
//             autoPlay
//             loop
//             style={{ width: 120, height: 120 }}
//           />
//           <Text style={{ color: "white", marginTop: 10 }}>Processing...</Text>
//         </View>
//       </Modal>

//       <Text style={styles.title}>🌿Discover Nearby Herbs!</Text>
//       <Text style={styles.subtitle}>Get Suggestion Near You</Text>

//       <View style={styles.locationBox}>
//         {coords ? (
//           <View style={{ flex: 1 }}>
//             <MapboxGL.MapView style={styles.map}>
//               <MapboxGL.Camera
//                 centerCoordinate={[coords.longitude, coords.latitude]}
//                 zoomLevel={14}
//               />
//               <MapboxGL.PointAnnotation
//                 id="userLocation"
//                 coordinate={[coords.longitude, coords.latitude]}
//               />
//             </MapboxGL.MapView>
//             <Text style={styles.locationText}>
//               📍 Latitude: {coords.latitude.toFixed(4)}, Longitude: {coords.longitude.toFixed(4)}
//             </Text>
//           </View>
//         ) : (
//           <View style={{ alignItems: "center" }}>
//             <Ionicons name="location-outline" size={32} color="#2d6a4f" />
//             <Text style={styles.locationText}>
//               {locationRequested
//                 ? "Please upload your location"
//                 : "Your location will appear here"}
//             </Text>
//           </View>
//         )}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={getUserLocation}>
//         <Ionicons name="refresh" size={22} color="white" />
//         <Text style={styles.buttonText}>Refresh Location</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.buttonSecondary} onPress={handleUploadLocation}>
//         <Ionicons name="cloud-upload-outline" size={22} color="#2d6a4f" />
//         <Text style={styles.buttonTextSecondary}>Upload Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#C1D8C3",
//     padding: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loaderContainer: {
//     flex: 1,
//     backgroundColor: "#000000aa",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#2d6a4f",
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 30,
//   },
//   locationBox: {
//     backgroundColor: "#E9F5DB",
//     width: "100%",
//     height: 300,
//     borderRadius: 10,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     marginBottom: 20,
//     overflow: "hidden",
//     justifyContent: "center",
//   },
//   locationText: {
//     fontSize: 14,
//     color: "#333",
//     padding: 10,
//     textAlign: "center",
//   },
//   map: {
//     flex: 1,
//   },
//   button: {
//     flexDirection: "row",
//     backgroundColor: "#2d6a4f",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 100,
//     marginVertical: 10,
//     width: "90%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
//   buttonSecondary: {
//     flexDirection: "row",
//     backgroundColor: "#E9F5DB",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 100,
//     marginVertical: 10,
//     width: "90%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: "#2d6a4f",
//     borderWidth: 2,
//   },
//   buttonTextSecondary: {
//     color: "#2d6a4f",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
// });

// export default LocationScreen;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   PermissionsAndroid,
//   Platform,
//   Linking,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import LottieView from "lottie-react-native";


// const LocationScreen = () => {
//   const [coords, setCoords] = useState(null);
//   const [locationRequested, setLocationRequested] = useState(false);
//   const [locationUploaded, setLocationUploaded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const getUserLocation = async () => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//       Alert.alert("Permission Denied", "Location permission is required.");
//       return;
//     }

//     setLocationRequested(true);
//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCoords({ latitude, longitude });
//         setLoading(false);
//         Alert.alert("Location Ready", "Please upload your location.");
//       },
//       (error) => {
//         console.error(error);
//         setLoading(false);
//         Alert.alert("Error", "Failed to get location.");
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const handleUploadLocation = () => {
//     if (!locationRequested || !coords) {
//       Alert.alert("Not Ready", "Please refresh location first.");
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       setLocationUploaded(true);
//       setLoading(false);
//       Alert.alert("Success", "Your location has been successfully uploaded.");
//     }, 1500);
//   };

//   const openInGoogleMaps = () => {
//     if (!coords) {
//       Alert.alert("No Location", "Location not available yet.");
//       return;
//     }

//     const url = `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`;
//     Linking.openURL(url).catch(err =>
//       Alert.alert("Error", "Failed to open Google Maps.")
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Loader Modal */}
//       <Modal transparent visible={loading}>
//         <View style={styles.loaderContainer}>
//           <LottieView
//             source={require("../assets/animations/square-loader.json")}
//             autoPlay
//             loop
//             style={{ width: 120, height: 120 }}
//           />
//           <Text style={{ color: "white", marginTop: 10 }}>Processing...</Text>
//         </View>
//       </Modal>

//       <Text style={styles.title}>🌿Discover Nearby Herbs!</Text>
//       <Text style={styles.subtitle}>Get Suggestion Near You</Text>

//       <View style={styles.locationBox}>
//         {coords ? (
//           <View style={{ flex: 1 }}>
//             <MapboxGL.MapView style={styles.map}>
//               <MapboxGL.Camera
//                 centerCoordinate={[coords.longitude, coords.latitude]}
//                 zoomLevel={14}
//               />
//               <MapboxGL.PointAnnotation
//                 id="userLocation"
//                 coordinate={[coords.longitude, coords.latitude]}
//               />
//             </MapboxGL.MapView>
//             <Text style={styles.locationText}>
//               📍 Latitude: {coords.latitude.toFixed(4)}, Longitude: {coords.longitude.toFixed(4)}
//             </Text>
//           </View>
//         ) : (
//           <View style={{ alignItems: "center" }}>
//             <Ionicons name="location-outline" size={32} color="#2d6a4f" />
//             <Text style={styles.locationText}>
//               {locationRequested
//                 ? "Please upload your location"
//                 : "Your location will appear here"}
//             </Text>
//           </View>
//         )}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={getUserLocation}>
//         <Ionicons name="refresh" size={22} color="white" />
//         <Text style={styles.buttonText}>Refresh Location</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.buttonSecondary} onPress={handleUploadLocation}>
//         <Ionicons name="cloud-upload-outline" size={22} color="#2d6a4f" />
//         <Text style={styles.buttonTextSecondary}>Upload Location</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.buttonSecondary} onPress={openInGoogleMaps}>
//         <Ionicons name="map-outline" size={22} color="#2d6a4f" />
//         <Text style={styles.buttonTextSecondary}>Open in Google Maps</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#C1D8C3",
//     padding: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loaderContainer: {
//     flex: 1,
//     backgroundColor: "#000000aa",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#2d6a4f",
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 30,
//   },
//   locationBox: {
//     backgroundColor: "#E9F5DB",
//     width: "100%",
//     height: 300,
//     borderRadius: 10,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     marginBottom: 20,
//     overflow: "hidden",
//     justifyContent: "center",
//   },
//   locationText: {
//     fontSize: 14,
//     color: "#333",
//     padding: 10,
//     textAlign: "center",
//   },
//   map: {
//     flex: 1,
//   },
//   button: {
//     flexDirection: "row",
//     backgroundColor: "#2d6a4f",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 100,
//     marginVertical: 10,
//     width: "90%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
//   buttonSecondary: {
//     flexDirection: "row",
//     backgroundColor: "#E9F5DB",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 100,
//     marginVertical: 10,
//     width: "90%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: "#2d6a4f",
//     borderWidth: 2,
//   },
//   buttonTextSecondary: {
//     color: "#2d6a4f",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
// });

// export default LocationScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const LocationScreen = () => {
  const latitude = 32.5834;
  const longitude = 71.5370;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: mapUrl }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LocationScreen;
