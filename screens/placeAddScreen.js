import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CButton from "../components/customButton";
import Icon from 'react-native-vector-icons/Ionicons';
import Font from "../components/Font"
import ImgPicker from "../components/imgPicker";
import MapPicker from "../components/mapPicker";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/app-context";
import { sendAddPlaceReq } from "../util/places";
import { Entypo } from '@expo/vector-icons';
export default function PlaceAddScreens({ route }) {
    const navigation = useNavigation();
    const ctx = useContext(AppContext);
    const [mapURI, setMapURI] = useState();
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    /**chooseLocation (Map) 쪽에서 보내준 params */
    const coordinate = route.params;
    const isFocused = useIsFocused();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (<TouchableOpacity onPress={storageRegiHandle} style={{ justifyContent: "flex-end" }}>
                    <Entypo name="check" size={24} color="steelblue" />
                </TouchableOpacity>)
            }
        })

    }, [ctx.placeImg, ctx.placeImg, ctx.placeLocation, ctx.placeImgBase64])


    const imagePickHandle = (uri) => {
        ctx.setPlaceImg(uri)
    }

    /**장소 위경도랑 이미지 base64 넘겨줄거임. -> firebase에 저장해야 됨.*/
    const storageRegiHandle = async () => {

        const data = {
            title: ctx.placeInfo,
            fileUri: ctx.placeImg,
            location: ctx.placeLocation
        }

        try {
            await sendAddPlaceReq(data, ctx.placeImgBase64, ctx.value.idToken, ctx.value.email, ctx.address);

        } catch (err) {
             console.log(err) }
        navigation.navigate("placeHome");

    }

    const changeHandle = (val) => {
        ctx.setPlaceInfo(val)
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.totalBox}>
                <View style={{ flexDirection: "row" }}>
                    <Font style={styles.titleText}>리뷰를 남겨보세요</Font>
                </View>

                <TextInput
                    placeholder="장소에 대한 리뷰를 남겨주세요."
                    style={styles.textinput}
                    onChangeText={changeHandle}
                    keyboardType="twitter" />
                <ImgPicker />
                <MapPicker />
            </View>
        </TouchableWithoutFeedback>)
}

const styles = StyleSheet.create({
    totalBox: {
        flex: 1
    },
    titleText: {
        flex: 1

    },
    textinput: {
        paddingHorizontal: 20,
        height: 30,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        marginTop: 10,
        borderColor: "steelblue",
        fontSize: 15,
        paddingVertical: 3
    },
    imagePreviewBox: {
        flex: 1,
        backgroundColor: "white",
        maxHeight: 250,
        marginHorizontal: 10,
        marginTop: 10
    },
    photoiconBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20
    },
    mapPreviewBox: {
        flex: 1,
        backgroundColor: "white",
        maxHeight: 250,
        marginHorizontal: 10
    },
    mapiconBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20
    }


});