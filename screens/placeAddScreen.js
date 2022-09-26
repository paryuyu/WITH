import { View,Text,StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CButton from "../components/customButton";
import Icon from 'react-native-vector-icons/Ionicons';
import Font from "../components/Font"
import ImgPicker from "../components/imgPicker";
import MapPicker from "../components/mapPicker";
export  default function PlaceAddScreens() {


    



    return ( <View style={styles.totalBox}>
        <Font style={styles.titleText}>리뷰를 남겨보세요</Font>
        <TextInput
        placeholder="장소에 대한 리뷰를 남겨주세요."
        style={styles.textinput}/>
        <ImgPicker/>
        <MapPicker/>

        </View> )
}

const styles = StyleSheet.create({
    totalBox:{
    flex:1
    },
    titleText:{
        flex:1

    },
    textinput:{
        paddingHorizontal:20,
        height:30,
        //backgroundColor:"yellow",
        borderBottomWidth:1,
        marginHorizontal:5,
        marginTop:10,
        borderColor:"steelblue",
        fontSize:15,
        paddingVertical:3
    },
    imagePreviewBox:{
        flex:1,
        backgroundColor:"white",
        maxHeight:250,
        marginHorizontal:10,
        marginTop:10
    },
    photoiconBox:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:20
    },
    mapPreviewBox:{
        flex:1,
        backgroundColor:"white",
        maxHeight:250,
        marginHorizontal:10
    },
    mapiconBox:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:20
    }


});