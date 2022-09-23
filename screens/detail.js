import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { View,Text,StyleSheet, ViewBase, Pressable, Alert } from "react-native";
import CButton from "../components/customButton";
import { AppContext } from "../context/app-context";
import { Delete } from "../util/content";




function Detail({route}) {
    const ctx = useContext(AppContext)
    let {tag} = route.params;

    let navigation = useNavigation();
    const updatePressHandle = () => {
        navigation.navigate("update", {tag:tag})
    }

    
    const deletePressHandle =  () => {
        Alert.alert(
            "Alert Title",
            "삭제 하시겠습니까?",
            [
              { text: "OK", onPress: async () => {
                await Delete(ctx.value.idToken, tag.id);
                ctx.setRefresh(false)
                navigation.navigate("Community")
              }

            },
              {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "destructive"
                }
            ])
        
    }





    return ( <View style={{flex:1}}>
        <View style={styles.headerBox}> 
        <View>
        <Text style={styles.header}>{tag.title}</Text>
        </View>
        <View style={styles.miniHeader}>
        <View>
        <Text style={styles.miniHeaderText}>{tag.owner}</Text>
        </View>
        <View>
        <Text style={styles.miniHeaderText}>{tag.createdAt.slice(0,10)} ( {tag.createdAt.slice(11,19)} )</Text>
        </View>
        </View>
        </View>

        

        <View style={styles.contentBox}>
        <Text style={styles.content}>{tag.content}</Text>
   
        </View>
        {tag.owner == ctx.value.email? <View style={styles.buttonBox}>
                <Pressable style={styles.button} onPress={updatePressHandle}>
                <CButton >수정</CButton>
                </Pressable>
                <Pressable style={styles.button} onPress={deletePressHandle}>
                <CButton>삭제</CButton>
                </Pressable>
                </View> : null }
    </View> );
}

const styles = StyleSheet.create({
    headerBox:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:20
    },
    miniHeader:{
        justifyContent:"right",
        marginTop:15,
        padding:10,
        opacity:0.7
    },
    miniHeaderText:{
        color:"black",
        textAlign:"right"
    },

    header:{
        fontWeight:"bold",
        fontSize:20,
        marginTop:30,
        marginBottom:10,
        borderBottomWidth:3,
        borderBottomColor:"steelblue",
        color:"steelblue",
    },

    content:{
        marginHorizontal:15,
        paddingHorizontal:5,
        paddingVertical:15,
        minHeight:150
    },
    contentBox:{
        borderTopColor:"#d0d0d0",
        borderTopWidth:1,
        borderBottomColor:"#d0d0d0",
        borderBottomWidth:1,
        marginHorizontal:5
    },
    button:{
        alignItems:"center"
    },
    buttonBox:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:15
    }
});

export default Detail;