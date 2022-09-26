import { Children } from "react";
import { Pressable,StyleSheet,Text ,View} from "react-native";
import { sendRegisterReq } from "../util/accounts";

function CButton({children}) {
    return (<View style={styles.outline}><Text style={styles.button}>{children}</Text></View> );
}
const styles = StyleSheet.create({
    button:{
         color:"white",
         textAlign:"center"
    } ,
    outline:{
        padding:10,
        margin:10,
        borderRadius:20,
        backgroundColor:"steelblue",
    }

});

export default CButton;