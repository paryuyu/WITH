import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image, ActivityIndicator, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location"
import createStaticMap, { getAddresses } from "../util/map";
import { useContext, useEffect, useState } from "react";
import CButton from "./customButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AppContext, PlaceContext } from "../context/app-context";
export default function MapPicker({ }) {
    const ctx = useContext(AppContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [locationPermission, requestLocationPremission] = useForegroundPermissions();
    const [mapURI, setMapURI] = useState("");
    const [loading, setloading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const pickerPress = () => {
        if (locationPermission.status == PermissionStatus.DENIED ||
            locationPermission.status == PermissionStatus.UNDETERMINED) {

            let permission = requestLocationPremission();
            if (!permission.granted) {
                return false;
            }
            return true;
        }


    }

    useEffect(() => {

        let mapUri = createStaticMap(ctx.placeLocation?.latitude, ctx.placeLocation?.longitude);
        setMapURI(mapUri);

        /**조건주기 */
    }, [ctx.placeLocation])


    async function currentPlace() {
        try {
            let current = await getCurrentPositionAsync();
            let currentadd = await getAddresses(current.coords.latitude, current.coords.longitude);

            ctx.setPlaceLocation(current.coords);
            ctx.setAddress(currentadd.formatted_address)
        } catch (err) {
            console.log(err)
        }

    }


    const mapPress = async () => {
        setloading(true);
        if (locationPermission.status == PermissionStatus.DENIED ||
            locationPermission.status == PermissionStatus.UNDETERMINED) {

            let permission = requestLocationPremission();
            if (!permission.granted) {
                return;
            }
        }

        const rst = await getCurrentPositionAsync();
        navigation.navigate("chooseLocation", { lat: rst.coords.latitude, lng: rst.coords.longitude });
        setloading(false);
    }




    if (loading) {
        return <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator size={36} color="steelblue" /></View>

    }

    return (<View style={{ flex: 1 }}>

        <View style={styles.mapPreviewBox}>
            {mapURI && <Image source={{ uri: mapURI }} style={{ flex: 1 }} />}

            <Text style={styles.address}>{ctx.address?.slice(5, 24)}</Text>
        </View>

        <View style={styles.mapiconBox} >

            <TouchableOpacity onPress={pickerPress}>
                <Icon name="flag-outline" size={30} color="steelblue"></Icon>
            </TouchableOpacity>

            <TouchableOpacity onPress={mapPress}>
                <Icon name="map-outline" size={30} color="steelblue"></Icon>
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
        borderRadius: 10
    },
    mapiconBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20
    },
    text: {
        flex: 1,
        textAlign: "center",

    },
    address: {
        textAlign: "center",
        color: "steelblue",
        fontSize: 18,
        // borderWidth:2,
        // borderColor:"#d0d0d0",
        borderRadius: 10,
        paddingVertical: 5
    }
});