import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CButton from "../components/customButton";
import PlaceList from "../components/placeList";
import Font from "../components/Font";
import { AppContext } from "../context/app-context";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";

/**거리계산식 */
const addRangeField = (arr, lat, lng) => {

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    const cvt = arr.map((one) => {
        const targetlat = one.location.latitude;
        const targetlng = one.location.longitude;

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(targetlat - lat);  // deg2rad below
        var dLon = deg2rad(targetlng - lng);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(targetlat)) * Math.cos(deg2rad(lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return { ...one, range: d.toFixed(2) };

    });

    return cvt;
}




function PlaceScreen() {
    const ctx = useContext(AppContext);
    const navigation = useNavigation();
    const [placeItem, setPlaceItem] = useState([]);
    const [refreshed, setRefreshed] = useState(false);
    const [locationPermission, requestLocationPermission] = useForegroundPermissions();
    const [currentLat, setCurrentLat] = useState(null);
    const [currentLng, setCurrentLng] = useState(null);
    const [newplace,setNewPlace] = useState(null);
    const pressHandle = () => {
        ctx.setAddress(null)
        ctx.setPlaceLocation(null)
        navigation.navigate("place")
    }

    const isfocused = useIsFocused()

    async function reads() {
        try{
            const res = await axios.get(`https://with-2aba0-default-rtdb.asia-southeast1.firebasedatabase.app/place.json`).then(res => {
                setPlaceItem(res.data);
            }
            )
        }catch(err){
            console.log(err)
        }
     
    }

    useEffect(() => {

        reads();

        if (!ctx.refresh) {
            ctx.setRefresh(true);
        }

        let rst = Object.keys(placeItem).map((one) => {
            let newRst = placeItem[one].placeItem;
            newRst.id = one;
            return newRst;
           
        })

        setNewPlace(rst);
        position();


    }, [isfocused])


    async function position() {

        try {
            let position = await getCurrentPositionAsync();
            setCurrentLat(position.coords.latitude);
            setCurrentLng(position.coords.longitude);
            if (newplace !== null && currentLat !== null && currentLng !== null) {
                let newRst = addRangeField(newplace, currentLat, currentLng)
                setNewPlace(newRst);
             }
        } catch (err) {
            console.log(err)
        }
    }


    return (<View style={{ flex: 1 }}>
        <View style={styles.headerBox}>
            <Font>장소등록 홈</Font>
            <Pressable onPress={pressHandle}>
                <CButton>작성하기</CButton>
            </Pressable>
        </View>

        <FlatList
            data={newplace}
            keyExtractor={(one) => one.id}
            renderItem={({ item, index }) => {
                return <PlaceList item={item} navigation={navigation} />
            }}
        />
    </View>);
}

const styles = StyleSheet.create({
    headerBox: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
export default PlaceScreen;