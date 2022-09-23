import { useFonts } from "expo-font";
import { View,StyleSheet,Text } from "react-native";


function Font({children}) {



const [loaded] = useFonts({
    "PermanentMarker": require("../assets/font/PermanentMarker-Regular.ttf"),
    "Jua": require("../assets/font/Jua-Regular.ttf"),
  });

  if(!loaded){
    return <></>
  }

    return ( <View><Text style={styles.fonts}>{children}</Text></View> );
}

const styles = StyleSheet.create({
    fonts:{
        fontFamily:"Jua",
        fontSize:30,
        marginLeft:15,
        marginVertical:10,
        color:"steelblue"
    }
});

export default Font;