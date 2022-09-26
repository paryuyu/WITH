import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { View,Text ,Pressable, Alert, StyleSheet} from "react-native";
import CButton from "../components/customButton";
import { AppContext } from "../context/app-context";
import Font from "../components/Font";
import UFont from "../components/FontTwo";
function Profile() {
const navi = useNavigation()
const ctx = useContext(AppContext);
    const pressHandle = () =>{
        Alert.alert(
            "Alert Title",
            "로그아웃 하시겠습니까?",
            [
              { text: "OK", onPress: () => {
                ctx.dispatch({type:"logout", payload:null})
                AsyncStorage.removeItem("authentication")
              }

            },
              {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "destructive"
                }
            ])
    }

    return ( <View style={styles.profileoutBox}>
        <View style={styles.profileBox}>
        <View><UFont>Profile</UFont></View>
        <View><Text>{ctx.value.email}</Text></View>
        </View>
        <Pressable  onPress={pressHandle}>
        <CButton>
          로그아웃
        </CButton>
        </Pressable>
        </View> );
}

const styles = StyleSheet.create({
  profileBox:{
    
  },
  profileoutBox:{
    flex:1,
    alignItems:"center"
  }
});

export default Profile;