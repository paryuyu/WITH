import { View, Text, StyleSheet, Pressable,TouchableOpacity ,Image} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from "expo-location"
import createStaticMap from "../util/map";
import { useState } from "react";

export default function MapPicker() {


const [locationPermission, requestLocationPremission] = useForegroundPermissions();
const [mapURI,setMapURI] =  useState();
const mapPress = () =>{
/**권한체크*/
if(locationPermission.status == PermissionStatus.DENIED ||
    locationPermission.status == PermissionStatus.UNDETERMINED ){
       let permission =  requestLocationPremission();
       if(!permission.granted){
        return;
       }
    }

    getCurrentPositionAsync().then(rst=>
    { const mapUri = createStaticMap(rst.coords.latitude,rst.coords.longitude)
        setMapURI(mapUri);
    }
        ).catch(err=>console.log(err))
   
    
}

const pickerPress = () =>{

}




    return (<View style={{flex:1}}>
        <View style={styles.mapPreviewBox}>
            {mapURI&&<Image source={{uri:mapURI}} style={{flex:1}}/>}
        </View>
        <View style={styles.mapiconBox} >

            <TouchableOpacity onPress={mapPress}>
                <Icon name="map-outline" size={30} color="steelblue"></Icon>
            </TouchableOpacity>

            <TouchableOpacity onPress={pickerPress}>
                <Icon name="flag-outline" size={30} color="steelblue"></Icon>
            </TouchableOpacity>
        </View>
    </View>);






};

const styles = StyleSheet.create({
    mapPreviewBox: {
        flex: 1,
        backgroundColor: "white",
        maxHeight: 250,
        marginHorizontal: 10,
    },
    mapiconBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20
    },
    text:{
        flex:1,
        textAlign:"center",
        
    }
});