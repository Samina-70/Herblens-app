import {createDrawerNavigator} from "@react-navigation/drawer";
import RootStack from "./RootStack";
import DrawerContent from "../Components/DrawerContent";

const Drawer = createDrawerNavigator();


const RootDrawer = ()=>{
    return(
        <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={RootStack}/>
        </Drawer.Navigator>
    );
};


export default RootDrawer;