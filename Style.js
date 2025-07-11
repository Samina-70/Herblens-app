import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        minHeight: "100%",
        backgroundColor: "#B2C9AD",
        // backgroundColor: "#C1D8C3",
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70,
        // backgroundColor: "#C1D8C3",
        backgroundColor: "#B2C9AD",
        
    },
    logo: {
        height: 120,
        width: 120,
        backgroundColor: "#fff", 
        borderRadius: 60,
    },
    loginContainer: {
        // backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginTop: 20,
        // backgroundColor: "#C1D8C3",
        backgroundColor: "#B2C9AD",
    },
    text_header: {
        color: "#2d6a4f",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 20,
    },
    action: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        backgroundColor: "#e9f5db", 
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: "#2d6a4f",
        // borderColor: "#420475",
        borderRadius: 50,
        marginTop: 15,
    },
    icon: {
        marginRight: 10,
        fontSize: 22,
    },
    textInput: {
        flex: 1,
        // color: "#05375a",
        color: "#2d6a4f",
        fontSize: 16,
        placeholderTextColor:"gray",
    },
    forgotPassword: {
        color: "#2d6a4f",
        alignSelf: "flex-end",
        marginTop: 10,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: "#2d6a4f",
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: "center",
        marginTop: 20,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    bottomButton: {
        width: "100%",
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    inBut2:{
        backgroundColor:"#2d6a4f",
        height:65,
        width:65,
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
    },
    smallIcon2: {
        fontSize:40,
    },
    bottomText: {
        color:"black",
        fontSize:12,
        fontWeight:600,
        marginTop:5,
    },
    authContainer: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        marginTop: 20, 
      },
      
      authText: {
        fontSize: 16, 
        // color: "#919191",
        color:"#5F6F65",
        marginRight: 5, 
      },
      
      authButton: {
        fontSize: 16,
        color: "#2d6a4f", 
        fontWeight: "bold",
      },
    //   textInput: {
    //     flex: 1,
    //     paddingLeft: 10,
    //     color: "#05375a",
    //   },
      
    //   action: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     marginTop: 10,
    //     borderBottomWidth: 1,
    //     borderBottomColor: "#ccc",
    //     paddingBottom: 5,
    //   },
      
      errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
        marginBottom: 10,
      },
      
      subHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5F6F65",
        textAlign: "center",
        marginBottom: 20,
      },
      
      separator: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5F6F65",
        marginVertical: 15,
        textAlign: "center",
      },
          
      
});

export default styles;

// import { StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//     mainContainer: {
//         backgroundColor: "white",
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color:"white",
//     },
//     smallIcon: {
//         marginRight:10,
//         fontSize:24,
//     },
//     logoContainer:{
//         justifyContent:'center',
//         alignItems:'center',
//     },
//     logo:{
//         height:260,
//         width:260,
//         marginTop:30,
//     },
//     text_footer: {
//         color:"#05375a",
//         fontSize:18,
//     },
//     action: {
//         flexDirection:"row",
//         paddingTop:14,
//         paddingBottom:3,
//         marginTop:15,
//         paddingHorizontal:15,
//         borderWidth:1,
//         borderColor:"#420475",
//         borderRadius:50,
//     },
//     textInput: {
//         flex:1,
//         marginTop:12,
//         color:"#05375a",
//     },
//     loginContainer: {
//         backgroundColor: "#fff",
//         borderTopLeftRadius:30,
//         borderTopRightRadius:30,
//         paddingHorizontal:20,
//         paddingVertical:30,
//     },
//     header: {
//         justifyContent:"flex-end",
//         paddingHorizontal:20,
//     },
//     text_header:{
//         color: "#420475",
//         fontWeight: "bold",
//         fontSize:30,
//     },
//     button:{
//         alignItems: "center",
//         marginTop:20,
//         textAlign:"center",
//         margin:20,
//     },
//     input:{
//         width:"70%",
//         backgroundColor: "#420475",
//         alignItems:"center",
//         paddingHorizontal:15,
//         paddingVertical:15,
//         borderRadius:50,
//     },
//     
//     
//     
//     

// });

// export default styles; 