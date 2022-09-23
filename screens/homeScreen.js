import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useContext } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, Alert } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { AppContext } from "../context/app-context";

function Home() {
    const navigation = useNavigation();
    const ctx = useContext(AppContext);

    const [loaded] = useFonts({
        "PermanentMarker": require("../assets/font/PermanentMarker-Regular.ttf")
      });
    
      if(!loaded){
        return <></>
      }
    const pressHandle = () => {
        navigation.navigate("Login")
    }

    return (<View style={styles.outline}>
        <Text style={{fontFamily:"PermanentMarker" ,fontSize: 60, color:"steelblue"}}>WITH !</Text>
        {ctx.value? <Text>hi ! {ctx.value.email}</Text> : <Pressable><Text onPress={pressHandle}>로그인으로 바로가기</Text></Pressable>}
    </View>);
}

const styles = StyleSheet.create({
    outline: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    img: {
        flex: 1,
    }
});

export default Home;