// import React, { useEffect, useState, useContext } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { UserContext } from "../context/UserContext";
// import Icon from "react-native-vector-icons/Feather";

// const ProfileScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(true);
//   const { user, setUser } = useContext(UserContext);

//   const getData = async () => {
//     const token = await AsyncStorage.getItem("token");

//     if (!token) {
//       console.error("Token is null or undefined");
//       setLoading(false);
//       return;
//     }

//     axios
//       .post("http://192.168.100.2:3000/userdata", { token })
//       .then((res) => {
//         if (res.data.status === "ok") {
//           setUser(res.data.data);
//         } else {
//           console.error("API Error:", res.data.message);
//         }
//       })
//       .catch((error) => console.error("Axios Error:", error))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#2d6a4f" />
//       </View>
//     );
//   }

//   if (!user) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Failed to load user data</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Profile Picture with Edit Icon */}
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
//           style={styles.profileImage}
//         />
//         <TouchableOpacity style={styles.editIconDp}>
//           <Icon name="edit-2" size={16} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {/* Name Section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Name</Text>
//         <View style={styles.sectionContent}>
//           <Text style={styles.value}>{user.name}</Text>
//           <TouchableOpacity>
//             <Icon name="edit-2" size={18} color="#2d6a4f" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Email Section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Email</Text>
//         <View style={styles.sectionContent}>
//           <Text style={styles.value}>{user.email}</Text>
//           <TouchableOpacity>
//             <Icon name="edit-2" size={18} color="#2d6a4f" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Mobile Section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Mobile Number</Text>
//         <View style={styles.sectionContent}>
//           <Text style={styles.value}>{user.mobile || "Not Provided"}</Text>
//           <TouchableOpacity>
//             <Icon name="edit-2" size={18} color="#2d6a4f" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f0fdf4",
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: "#2d6a4f",
//   },
//   editIconDp: {
//     position: "absolute",
//     bottom: 0,
//     right: 120 / 2 - 20,
//     backgroundColor: "#2d6a4f",
//     padding: 6,
//     borderRadius: 20,
//   },
//   section: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 5,
//   },
//   sectionContent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//   },
//   errorText: {
//     fontSize: 16,
//     color: "red",
//   },
// });

// export default ProfileScreen;

// import React, { useEffect, useState, useContext } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import axios from "axios";
// import { API_URL } from '@env';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { UserContext } from "../context/UserContext";
// import ImagePicker from "react-native-image-crop-picker";
// import AppLoader from "..Components/AppLoader";

// const ProfileScreen = () => {
//   const [loading, setLoading] = useState(true);
//   const { user, setUser } = useContext(UserContext);

//   const getData = async () => {
//     const token = await AsyncStorage.getItem("token");
//     if (!token) {
//       console.error("Token is null or undefined");
//       setLoading(false);
//       return;
//     }

//     axios
//       .post(`${API_URL}/userdata`, { token })
//       .then((res) => {
//         if (res.data.status === "ok") {
//           setUser(res.data.data);
//         } else {
//           console.error("API Error:", res.data.message);
//         }
//       })
//       .catch((error) => console.error("Axios Error:", error))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleProfileImageChange = async () => {
//     try {
//       const image = await ImagePicker.openPicker({
//         width: 500,
//         height: 500,
//         cropping: true,
//         compressImageQuality: 0.8,
//       });

//       const formData = new FormData();
//       formData.append("profilePic", {
//         uri: image.path,
//         type: image.mime,
//         name: "profile.jpg",
//       });

//       const token = await AsyncStorage.getItem("token");

//       const response = await axios.post(`${API_URL}/update-profile-pic`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.status === "ok") {
//         setUser(response.data.user);
//         Alert.alert("Success", "Profile picture updated!");
//       } else {
//         Alert.alert("Error", response.data.message || "Upload failed");
//       }
//     } catch (err) {
//       if (err.code !== "E_PICKER_CANCELLED") {
//         console.log("Error picking image:", err);
//         Alert.alert("Error", "Something went wrong while picking image.");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#2d6a4f" />
//       </View>
//     );
//   }

//   if (!user) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Failed to load user data</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Profile Picture */}
//       <TouchableOpacity style={styles.imageContainer} onPress={handleProfileImageChange}>
//         <Image
//           source={{ uri: user.profilePic?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
//           style={styles.profileImage}
//         />
//       </TouchableOpacity>

//       {/* Name Section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Name</Text>
//         <Text style={styles.value}>{user.name}</Text>
//       </View>

//       {/* Email Section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Email</Text>
//         <Text style={styles.value}>{user.email}</Text>
//       </View>

//       {/* Mobile Section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Mobile Number</Text>
//         <Text style={styles.value}>{user.mobile || "Not Provided"}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f0fdf4",
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: "#2d6a4f",
//   },
//   section: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 5,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//   },
//   errorText: {
//     fontSize: 16,
//     color: "red",
//   },
// });

// export default ProfileScreen;


// import React, { useEffect, useState, useContext } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import axios from "axios";
// import { API_URL } from '@env';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { UserContext } from "../context/UserContext";
// import ImagePicker from "react-native-image-crop-picker";
// import AppLoader from "../Components/AppLoader"; 

// const ProfileScreen = () => {
//   const [loading, setLoading] = useState(false);
//   const { user, setUser } = useContext(UserContext);

//   const getData = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         console.error("Token is null or undefined");
//         return;
//       }

//       const res = await axios.post(`${API_URL}/user/userdata`, { token });
//       if (res.data.status === "ok") {
//         setUser(res.data.data);
//       } else {
//         console.error("API Error:", res.data.message);
//       }
//     } catch (error) {
//       console.error("Axios Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleProfileImageChange = async () => {
//     try {
//       // const image = await ImagePicker.openPicker({
//       //   width: 400,
//       //   height: 400,
//       //   cropping: true,
//       //   cropperCircleOverlay: true,
//       //   avoidEmptySpaceAroundImage: true,
//       //   freeStyleCropEnabled: true,
//       //   mediaType: 'photo',
//       //   compressImageQuality: 0.8,
//       // });
//       const image = await ImagePicker.openPicker({
//         cropping: true,
//         cropperCircleOverlay: true,
//       });
//       console.log("Image path:", image.path);
      

//       const formData = new FormData();
//       formData.append("profilePic", {
//         uri: image.path,
//         type: image.mime,
//         name: "profile.jpg",
//       });

//       const token = await AsyncStorage.getItem("token");

//       setLoading(true); // Start loader during upload

//       const response = await axios.post(`${API_URL}/update-profile-pic`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.status === "ok") {
//         setUser(response.data.user);
//         Alert.alert("Success", "Profile picture updated!");
//       } else {
//         Alert.alert("Error", response.data.message || "Upload failed");
//       }
//     } catch (err) {
//       if (err.code !== "E_PICKER_CANCELLED") {
//         console.log("Error picking image:", err);
//         Alert.alert("Error", "Something went wrong while picking image.");
//       }
//     } finally {
//       setLoading(false); // Stop loader after upload
//     }
//   };

//   if (!user && !loading) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Failed to load user data</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* ✅ Global Loader */}
//       <AppLoader visible={loading} />

//       {/* Profile Picture */}
//       <TouchableOpacity style={styles.imageContainer} onPress={handleProfileImageChange}>
//         <Image
//           source={{ uri: user?.profilePic?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
//           style={styles.profileImage}
//         />
//       </TouchableOpacity>

//       {/* Name Section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Name</Text>
//         <Text style={styles.value}>{user?.name}</Text>
//       </View>

//       {/* Email Section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Email</Text>
//         <Text style={styles.value}>{user?.email}</Text>
//       </View>

//       {/* Mobile Section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Mobile Number</Text>
//         <Text style={styles.value}>{user?.mobile || "Not Provided"}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f0fdf4",
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: "#2d6a4f",
//   },
//   section: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 5,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//   },
//   errorText: {
//     fontSize: 16,
//     color: "red",
//   },
// });

// export default ProfileScreen;
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import axios from "axios";
import { API_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import ImagePicker from "react-native-image-crop-picker";
import AppLoader from "../Components/AppLoader";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token is null or undefined");
        return;
      }

      const res = await axios.post(`${API_URL}/user/userdata`, { token });
      if (res.data.status === "ok") {
        setUser(res.data.data);
      } else {
        console.error("API Error:", res.data.message);
      }
    } catch (error) {
      console.error("Axios Error:", error);
    } finally {
      setLoading(false);
    }
  };

const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        // Android 13+
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // Android <13
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn("Permission error:", err);
      return false;
    }
  }
  return true; // iOS
};

const handleProfileImageChange = async () => {
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) {
    Alert.alert("Permission Denied", "Cannot access gallery without permission.");
    return;
  }

  try {
    const image = await ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      includeBase64: false,
      forceJpg: true,
    });

    if (!image?.path) {
      Alert.alert("Error", "Image path not found.");
      return;
    }

    console.log("Selected image:", image);

    const formData = new FormData();
    formData.append("profilePic", {
      uri: Platform.OS === 'android' ? image.path.replace("file://", "") : image.path,
      type: image.mime,
      name: "profile.jpg",
    });

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "No token found.");
      return;
    }

    setLoading(true);

    const response = await axios.post(`${API_URL}/user/update-profile-pic`, formData, {
      headers: {
        // Don't set content-type manually here
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Upload response:", response.data);

    if (response.data.status === "ok") {
      setUser(response.data.user);
      Alert.alert("Success", "Profile picture updated!");
    } else {
      Alert.alert("Error", response.data.message || "Upload failed");
    }
  } catch (err) {
    console.log("Upload error:", err);
    Alert.alert("Upload Error", err?.message || "Something went wrong while uploading.");
  } finally {
    setLoading(false);
  }
};

  if (!user && !loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load user data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppLoader visible={loading} />

      <TouchableOpacity style={styles.imageContainer} onPress={handleProfileImageChange}>
        <Image
          source={{ uri: user?.profilePic?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.value}>{user?.mobile || "Not Provided"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0fdf4",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#2d6a4f",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default ProfileScreen;
