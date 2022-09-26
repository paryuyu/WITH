import { processFontFamily, useFonts } from "expo-font";
import { View,StyleSheet,Text } from "react-native";




function UFont({children}) {



const [loaded] = useFonts({
    "PermanentMarker": require("../assets/font/PermanentMarker-Regular.ttf"),
    "Jua": require("../assets/font/Jua-Regular.ttf"),
    "UhBee": require("../assets/font/UhBeeBold.ttf"),
  });

  if(!loaded){
    return <></>
  }

    return ( <View><Text style={styles.fonts}>{children}</Text></View> );
}

const styles = StyleSheet.create({
    fonts:{
        fontFamily:"UhBee",
        fontSize:30,
        marginLeft:15,
        marginVertical:10,
        color:"steelblue"
    }
});

export default UFont;