// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   PermissionsAndroid,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { API_URL } from '@env';
// import axios from "axios";
// import AppLoader from "../Components/AppLoader";


// const requestMediaPermission = async () => {
//   if (Platform.OS === 'android') {
//     const androidVersion = parseInt(Platform.Version, 10);

//     try {
//       if (androidVersion >= 33) {
//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//         ]);
//         return (
//           granted["android.permission.READ_MEDIA_IMAGES"] === "granted" &&
//           granted["android.permission.READ_MEDIA_VIDEO"] === "granted"
//         );
//       } else {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       }
//     } catch (error) {
//       console.warn("Permission error:", error);
//       return false;
//     }
//   }
//   return true;
// };

// const ScanScreen = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [herbDetails, setHerbDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(null);

//   const handleImage = async (type) => {
//     const permissionGranted = await requestMediaPermission();
//     if (!permissionGranted) {
//       Alert.alert("Permission Denied", "Cannot access media without permission.");
//       return;
//     }

//     const options = { mediaType: "photo", quality: 1 };

//     const callback = (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled picker");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//       } else {
//         const uri = response.assets[0].uri;
//         setSelectedImage(uri);
//         setHerbDetails(null);
//         setErrorMsg(null);
//         getPrediction(uri);
//       }
//     };

//     type === "camera"
//       ? launchCamera(options, callback)
//       : launchImageLibrary(options, callback);
//   };

//   const getPrediction = async (imageUri) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", {
//       uri: imageUri,
//       type: "image/jpeg",
//       name: "herb_image.jpg",
//     });
  
//     try {
//       const response = await axios.post(`${API_URL}/predict`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       // Handle herb not found explicitly
//       if (response.status === 200) {
//         if (response.data.herbDetails) {
//           setHerbDetails(response.data);
//           setErrorMsg(null);
//         } else {
//           Alert.alert("Herb Not Found", "No details found for this herb.");
//           setHerbDetails(null);
//         }
        
//       }
//     } catch (error) {
//       console.error("Prediction error:", error.response?.data || error.message);
  
//       if (error.response) {
//         const { status, data } = error.response;
  
//         if (status === 400 && data.error === "No image file uploaded") {
//           Alert.alert("Invalid Image", "Please select a valid image.");
//         } else if (status === 404 && data.message?.includes("No herb details")) {
//           Alert.alert("Herb Not Found", data.message);
//         } else if (status === 500 && data.error === "Invalid response from model") {
//           Alert.alert("Invalid Image", "The model could not interpret the image.");
//         } else {
//           Alert.alert("Prediction Error", data.error || "An unexpected error occurred.");
//         }
//       } else {
//         Alert.alert("Network Error", "Could not connect to the server. Please try again.");
//       }
  
//       setHerbDetails(null);
//       setErrorMsg("Prediction failed.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <AppLoader visible={loading} />
//       <Text style={styles.title}>🌿 Scan to Identify</Text>
//       <Text style={styles.subtitle}>Capture or upload an image to identify the herb.</Text>

//       <View style={styles.previewContainer}>
//         {selectedImage ? (
//           <Image source={{ uri: selectedImage }} style={styles.previewImage} />
//         ) : (
//           <Text style={styles.previewPlaceholder}>No Image Selected</Text>
//         )}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={() => handleImage("camera")}>
//         <Ionicons name="camera" size={20} color="white" />
//         <Text style={styles.buttonText}>Capture Image</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={() => handleImage("gallery")}>
//         <Ionicons name="image" size={20} color="white" />
//         <Text style={styles.buttonText}>Upload Image</Text>
//       </TouchableOpacity>

//       {errorMsg && (
//         <Text style={{ color: "red", marginTop: 20, fontWeight: "bold", textAlign: "center" }}>
//           {errorMsg}
//         </Text>
//       )}

//       {herbDetails && (
//         <View style={styles.detailsContainer}>
//           <Text style={styles.herbName}>{herbDetails.classLabel}</Text>
//           <Text>Confidence: {herbDetails.confidence.toFixed(2)}%</Text>

//           <Text style={styles.detailsTitle}>Scientific Name:</Text>
//           <Text>{herbDetails.herbDetails.Scientific_Name}</Text>

//           <Text style={styles.detailsTitle}>Description:</Text>
//           <Text>{herbDetails.herbDetails.Description}</Text>

//           <Text style={styles.detailsTitle}>Medicinal Uses:</Text>
//           {herbDetails.herbDetails.Medicinal_Uses.map((item, index) => (
//             <Text key={index}>• {item}</Text>
//           ))}

//           <Text style={styles.detailsTitle}>Health Benefits:</Text>
//           {herbDetails.herbDetails.Health_Benefits.map((item, index) => (
//             <Text key={index}>• {item}</Text>
//           ))}

//           <Text style={styles.detailsTitle}>Recommended For:</Text>
//           {herbDetails.herbDetails.Health_Conditions.map((item, index) => (
//             <Text key={index}>• {item}</Text>
//           ))}
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#C1D8C3",
//     alignItems: "center",
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#2d6a4f",
//     marginBottom: 7,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   previewContainer: {
//     width: 220,
//     height: 220,
//     backgroundColor: "#e9f5db",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 30,
//     marginBottom: 15,
//   },
//   previewImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   previewPlaceholder: {
//     color: "#666",
//     fontSize: 14,
//     fontStyle: "italic",
//   },
//   button: {
//     flexDirection: "row",
//     backgroundColor: "#2d6a4f",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 100,
//     marginVertical: 8,
//     width: "90%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
//   detailsContainer: {
//     marginTop: 30,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 15,
//     width: "100%",
//     elevation: 2,
//   },
//   herbName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#2d6a4f",
//     marginBottom: 5,
//   },
//   detailsTitle: {
//     marginTop: 10,
//     fontWeight: "bold",
//     color: "#555",
//   },
// });

// export default ScanScreen;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { API_URL } from "@env";
// import axios from "axios";
// import AppLoader from "../Components/AppLoader";
// import { pickImage } from "../utils/imagePicker"; // ✅ Import reusable function

// const ScanScreen = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [herbDetails, setHerbDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(null);

//   const handleImage = async (type) => {
//     pickImage(type, (uri) => {
//       setSelectedImage(uri);
//       setHerbDetails(null);
//       setErrorMsg(null);
//       getPrediction(uri);
//     });
//   };

//   const getPrediction = async (imageUri) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", {
//       uri: imageUri,
//       type: "image/jpeg",
//       name: "herb_image.jpg",
//     });

//     try {
//       const response = await axios.post(`${API_URL}/predict`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.status === 200) {
//         if (response.data.herbDetails) {
//           setHerbDetails(response.data);
//           setErrorMsg(null);
//         } else {
//           Alert.alert("Herb Not Found", "No details found for this herb.");
//           setHerbDetails(null);
//         }
//       }
//     } catch (error) {
//       console.error("Prediction error:", error.response?.data || error.message);

//       if (error.response) {
//         const { status, data } = error.response;

//         if (status === 400 && data.error === "No image file uploaded") {
//           Alert.alert("Invalid Image", "Please select a valid image.");
//         } else if (status === 404 && data.message?.includes("No herb details")) {
//           Alert.alert("Herb Not Found", data.message);
//         } else if (status === 500 && data.error === "Invalid response from model") {
//           Alert.alert("Invalid Image", "The model could not interpret the image.");
//         } else {
//           Alert.alert("Prediction Error", data.error || "An unexpected error occurred.");
//         }
//       } else {
//         Alert.alert("Network Error", "Could not connect to the server. Please try again.");
//       }

//       setHerbDetails(null);
//       setErrorMsg("Prediction failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <AppLoader visible={loading} />
//       <Text style={styles.title}>🌿 Scan to Identify</Text>
//       <Text style={styles.subtitle}>Capture or upload an image to identify the herb.</Text>

//       <View style={styles.previewContainer}>
//         {selectedImage ? (
//           <Image source={{ uri: selectedImage }} style={styles.previewImage} />
//         ) : (
//           <Text style={styles.previewPlaceholder}>No Image Selected</Text>
//         )}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={() => handleImage("camera")}>
//         <Ionicons name="camera" size={20} color="white" />
//         <Text style={styles.buttonText}>Capture Image</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={() => handleImage("gallery")}>
//         <Ionicons name="image" size={20} color="white" />
//         <Text style={styles.buttonText}>Upload Image</Text>
//       </TouchableOpacity>

//       {errorMsg && (
//         <Text style={{ color: "red", marginTop: 20, fontWeight: "bold", textAlign: "center" }}>
//           {errorMsg}
//         </Text>
//       )}

//       {herbDetails && (
//         <View style={styles.detailsContainer}>
//           <Text style={styles.herbName}>{herbDetails.classLabel}</Text>
//           <Text>Confidence: {herbDetails.confidence.toFixed(2)}%</Text>

//           <Text style={styles.detailsTitle}>Scientific Name:</Text>
//           <Text>{herbDetails.herbDetails.Scientific_Name}</Text>

//           <Text style={styles.detailsTitle}>Description:</Text>
//           <Text>{herbDetails.herbDetails.Description}</Text>

//           <Text style={styles.detailsTitle}>Medicinal Uses:</Text>
//           {herbDetails.herbDetails.Medicinal_Uses.map((item, index) => (
//             <Text key={index}>• {item}</Text>
//           ))}

//           <Text style={styles.detailsTitle}>Health Benefits:</Text>
//           {herbDetails.herbDetails.Health_Benefits.map((item, index) => (
//             <Text key={index}>• {item}</Text>
//           ))}

//           <Text style={styles.detailsTitle}>Recommended For:</Text>
//           {herbDetails.herbDetails.Health_Conditions.map((item, index) => (
//             <Text key={index}>• {item}</Text>
//           ))}
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#C1D8C3",
//     alignItems: "center",
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#2d6a4f",
//     marginBottom: 7,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   previewContainer: {
//     width: 220,
//     height: 220,
//     backgroundColor: "#e9f5db",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 30,
//     marginBottom: 15,
//   },
//   previewImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   previewPlaceholder: {
//     color: "#666",
//     fontSize: 14,
//     fontStyle: "italic",
//   },
//   button: {
//     flexDirection: "row",
//     backgroundColor: "#2d6a4f",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 100,
//     marginVertical: 8,
//     width: "90%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
//   detailsContainer: {
//     marginTop: 30,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 15,
//     width: "100%",
//     elevation: 2,
//   },
//   herbName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#2d6a4f",
//     marginBottom: 5,
//   },
//   detailsTitle: {
//     marginTop: 10,
//     fontWeight: "bold",
//     color: "#555",
//   },
// });

// export default ScanScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URL } from '@env';
import axios from "axios";
import AppLoader from "../Components/AppLoader";


const requestMediaPermission = async () => {
  if (Platform.OS === 'android') {
    const androidVersion = parseInt(Platform.Version, 10);

    try {
      if (androidVersion >= 33) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        return (
          granted["android.permission.READ_MEDIA_IMAGES"] === "granted" &&
          granted["android.permission.READ_MEDIA_VIDEO"] === "granted"
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (error) {
      console.warn("Permission error:", error);
      return false;
    }
  }
  return true;
};

const ScanScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [herbDetails, setHerbDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleImage = async (type) => {
    const permissionGranted = await requestMediaPermission();
    if (!permissionGranted) {
      Alert.alert("Permission Denied", "Cannot access media without permission.");
      return;
    }

    const options = { mediaType: "photo", quality: 1 };

    const callback = (response) => {
      if (response.didCancel) {
        console.log("User cancelled picker");
      } else if (response.errorMessage) {
        Alert.alert("Error", response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setSelectedImage(uri);
        setHerbDetails(null);
        setErrorMsg(null);
        getPrediction(uri);
      }
    };

    type === "camera"
      ? launchCamera(options, callback)
      : launchImageLibrary(options, callback);
  };

  const getPrediction = async (imageUri) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "herb_image.jpg",
    });
  
    try {
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Handle herb not found explicitly
      if (response.status === 200) {
        if (response.data.herbDetails) {
          setHerbDetails(response.data);
          setErrorMsg(null);
        } else {
          Alert.alert("Herb Not Found", "No details found for this herb.");
          setHerbDetails(null);
        }
        
      }
    } catch (error) {
      console.error("Prediction error:", error.response?.data || error.message);
  
      if (error.response) {
        const { status, data } = error.response;
  
        if (status === 400 && data.error === "No image file uploaded") {
          Alert.alert("Invalid Image", "Please select a valid image.");
        } else if (status === 404 && data.message?.includes("No herb details")) {
          Alert.alert("Herb Not Found", data.message);
        } else if (status === 500 && data.error === "Invalid response from model") {
          Alert.alert("Invalid Image", "The model could not interpret the image.");
        } else {
          Alert.alert("Prediction Error", data.error || "An unexpected error occurred.");
        }
      } else {
        Alert.alert("Network Error", "Could not connect to the server. Please try again.");
      }
  
      setHerbDetails(null);
      setErrorMsg("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppLoader visible={loading} />
      <Text style={styles.title}>🌿 Scan to Identify</Text>
      <Text style={styles.subtitle}>Capture or upload an image to identify the herb.</Text>

      <View style={styles.previewContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <Text style={styles.previewPlaceholder}>No Image Selected</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleImage("camera")}>
        <Ionicons name="camera" size={20} color="white" />
        <Text style={styles.buttonText}>Capture Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleImage("gallery")}>
        <Ionicons name="image" size={20} color="white" />
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      {errorMsg && (
        <Text style={{ color: "red", marginTop: 20, fontWeight: "bold", textAlign: "center" }}>
          {errorMsg}
        </Text>
      )}

      {herbDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.herbName}>{herbDetails.classLabel}</Text>
          <Text>Confidence: {herbDetails.confidence.toFixed(2)}%</Text>

          <Text style={styles.detailsTitle}>Scientific Name:</Text>
          <Text>{herbDetails.herbDetails.Scientific_Name}</Text>

          <Text style={styles.detailsTitle}>Description:</Text>
          <Text>{herbDetails.herbDetails.Description}</Text>

          <Text style={styles.detailsTitle}>Medicinal Uses:</Text>
          {herbDetails.herbDetails.Medicinal_Uses.map((item, index) => (
            <Text key={index}>• {item}</Text>
          ))}

          <Text style={styles.detailsTitle}>Health Benefits:</Text>
          {herbDetails.herbDetails.Health_Benefits.map((item, index) => (
            <Text key={index}>• {item}</Text>
          ))}

          <Text style={styles.detailsTitle}>Recommended For:</Text>
          {herbDetails.herbDetails.Health_Conditions.map((item, index) => (
            <Text key={index}>• {item}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#C1D8C3",
    alignItems: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2d6a4f",
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  previewContainer: {
    width: 220,
    height: 220,
    backgroundColor: "#e9f5db",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  previewPlaceholder: {
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
  },
  button: {
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  detailsContainer: {
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    elevation: 2,
  },
  herbName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d6a4f",
    marginBottom: 5,
  },
  detailsTitle: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#555",
  },
});

export default ScanScreen;  