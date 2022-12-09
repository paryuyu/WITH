import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CButton from "../components/customButton";
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppContext, PlaceContext } from "../context/app-context";
import createStaticMap, { getAddresses } from "../util/map";


/**지도 */
export default function ChooseLocationScreen({ route }) {
    const [coordinate, setCoordinate] = useState(null);

    const [markerLat, setMarkerLat] = useState();
    const [markerLng, setMarkerLng] = useState();

    /**이 값은 초기값(init)으로 활용하는데 mapPicker에서 받아와줌*/
    let { lat, lng } = route.params;

    const navigation = useNavigation();
    const ctx = useContext(AppContext);

    async function markMap() {
        ctx.setPlaceLocation(coordinate)

        try {
            let addressRst = await getAddresses(markerLat, markerLng);

        } catch (err) {
             console.log(err) 
        }
        ctx.setAddress(addressRst.formatted_address)
    }


    useEffect(() => {

        markMap();
        
        navigation.setOptions({
            headerRight: () => {
                return (<TouchableOpacity onPress={pressRegisterHandle} style={{ justifyContent: "flex-end" }}>
                    <Icon name="checkmark-outline" size={27} color="navy" />
                </TouchableOpacity>)
            }
        })

    }, [coordinate])


    const pressRegisterHandle = () => {

        if (coordinate) {
            navigation.navigate("place", { coordinate: coordinate })
        }


    }


    //console.log(lat, lng);
    /**지도 초기값 설정 */
    const init = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }


    /**맵 클릭했을 때 나오는 위치(위도, 경도) 값 얻기 */
    const pressHanle = (evt) => {

        setCoordinate(evt.nativeEvent?.coordinate)
        setMarkerLat(evt.nativeEvent.coordinate.latitude)
        setMarkerLng(evt.nativeEvent.coordinate.longitude)
    }


    return (<View style={{ flex: 1 }}>
        <MapView initialRegion={init} style={{ flex: 1 }} onPress={pressHanle} >
            {   /**마커 찍어주기 */
                coordinate &&
                <Marker coordinate={coordinate} />
            }

        </MapView>
    </View>);
}

