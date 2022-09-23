import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { View,Text ,Pressable, Alert} from "react-native";
import { AppContext } from "../context/app-context";


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
    return ( <View>
        <Text>Profile</Text>
        <Pressable>
        <Text onPress={pressHandle}>로그아웃</Text>
        </Pressable>
        </View> );
}

export default Profile;