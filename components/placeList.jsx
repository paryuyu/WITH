import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
function PlaceList({ item , navigation}) {

    const pressHandle = ()=>{
        navigation.navigate("PlaceDetail",{tag:item})
    }

    const heartPress = ()=>{

    }

    return (
        <Pressable onPress={pressHandle}>
        <View style={styles.itemBox}>
            <View style={styles.itmeHeader}>
                <Text style={styles.itemHeaderText}>{item.createdAt.slice(0, 10)}</Text>
                <Text style={styles.itemHeaderText}>{item.email}</Text>
            </View>
            <View style={styles.contentBox}>
            
                <View style={styles.img}>
                <Image source={{ uri: item.imageURL }} style={{ flex: 1, borderRadius: 10, width: 100 }} />
                </View>
                <View style={styles.contentBoxTwo}>
                <Text style={styles.contentText}>{item.title}</Text>
                </View>
         </View>
         <Text style={styles.itemAdreessText}>{item.placeAddress}</Text>
         <Icon name="heart" size={25} color="red" onPress={heartPress} style={styles.heartIcon} ></Icon>
                 </View>
        </Pressable>);
}

const styles = StyleSheet.create({
    itemBox: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 18,
        borderColor: "#d0d0d0",
        marginHorizontal: 10,
        marginBottom: 5,
        padding: 10
    },
    img: {
        height: 100
    },
    itmeHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemHeaderText: {
        fontSize: 12,
        color: "grey",
        marginBottom: 10
    },
    contentBox: {
        //backgroundColor: "red",
        flex:1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"flex-start"
    },
    contentText: {
        marginLeft:20,
        alignItems: "center",
        textAlign: "center",
       // backgroundColor:"red"
    },
    contentBoxTwo:{
        flexDirection:"column"
    },
    itemAdreessText:{
        fontSize: 12,
        color: "grey",
        marginTop: 15
    },
    heartIcon:{
        marginTop:10
    }

});

export default PlaceList;