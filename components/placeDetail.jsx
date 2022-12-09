import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { AppContext } from "../context/app-context";
import createStaticMap, { getAddresses } from "../util/map";
import { PlaceDelete } from "../util/places";
import CButton from "./customButton";
import Icon from 'react-native-vector-icons/Ionicons';

function PlaceDetail({ route }) {
    const ctx = useContext(AppContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const [mapUri, setMapUri] = useState();
    const [add, setAdd] = useState("");
    const { tag } = route.params;


    useEffect(() => {
        detailMap();
    }, [isFocused]);

    
    async function detailMap() {
        try {
            const mapuri = createStaticMap(tag.location?.latitude, tag.location?.longitude);
            setMapUri(mapuri)

            const addressRst = await getAddresses(tag.location?.latitude, tag.location?.longitude);
            setAdd(addressRst.formatted_address)

        } catch (err) { 
            console.log(err) }

    }

    const deletePressHandle = () => {
        PlaceDelete(ctx.value.idToken, tag.id)
        navigation.goBack();
    }

    return (<View style={{ flex: 1 }}>
        <View style={styles.headerBox}>
            <Text>{tag.createdAt.slice(0, 10)}</Text>
            <Text>{tag.email}</Text>
        </View>
      
        <View style={styles.totalimgBox}>
            <Image source={{ uri: tag.imageURL }} style={styles.contentImg}/>

            {mapUri && <Image source={{ uri: mapUri }} style={styles.map} />}

            <View style={styles.contentBox}>
                <Text style={styles.address}>{tag.placeAddress?.slice(5, 30)}</Text>
                <Text style={styles.titleText}>{tag.title}</Text>
            </View>
            {tag.email == ctx.value.email ? <View style={styles.buttonBox}>
                <Pressable style={styles.button} onPress={deletePressHandle}>
                    <CButton>삭제</CButton>
                </Pressable>
            </View> : null}
        </View>

    </View>);
}

const styles = StyleSheet.create({
    headerBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 10
    },
    header: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 30,
        marginBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: "steelblue",
        color: "steelblue",
    },
    miniHeader: {
        color: "black",
        textAlign: "right",
        marginTop: 10
    },
    contentImg: {
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 20,
        maxHeight: 200,
        minHeight: 180,
        marginBottom: 10
    },
    buttonBox: {
        alignItems: "flex-end",
        marginRight: 15,
        marginTop: 5
    },
    address: {
        fontSize: 17,
        textAlign: "center",
        color: "steelblue",
        marginBottom: 20,
        marginTop: 5
    },
    titleText: {
        textAlign: "center"
    },
    contentBox: {
        // flex:1,
        borderWidth: 3,
        marginHorizontal: 20,
        borderColor: "#d0d0d0",
        borderRadius: 10,
        backgroundColor: "white",
        maxHeight: 100,
        marginTop: 20,
        paddingVertical: 15
    },
    map: {
        flex: 1,
        borderRadius: 10,
        minHeight: 180,
        maxHeight: 200,
        marginHorizontal: 20,
    },
    totalimgBox: {
        flexDirection: "column",
    }
});

export default PlaceDetail;