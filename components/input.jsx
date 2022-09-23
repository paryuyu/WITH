import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { View, Text, TextInput, Button ,StyleSheet, Pressable } from "react-native";
import { AppContext } from "../context/app-context";
import { Write } from "../util/content";
import CButton from "./customButton";
function Input() {
    const ctx = useContext(AppContext);
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [owner, setOwner] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [token, setToken] = useState();
    //title,content, createdAt, owner

    /**제목입력 */
    const titleChangeHandle = (val) => {
        setTitle(val)
    }

    /**내용입력 */
    const contentChangeHandle = (val) => {
        setContent(val)
    }

    const PressHandle = () => {
        ctx.setRefresh(false);
        !async function () {
            try {
                console.log(title, content,  ctx.value.email,ctx.value.idToken);
                const recv = await Write(title, content, new Date(), ctx.value.email, ctx.value.idToken);
                navigation.navigate("Community")

            } catch (err) {
                console.log(err)
            }
        }();

    }

    

    return (<View>
        <View>
            <TextInput
                placeholder="title" onChangeText={titleChangeHandle} 
                style={styles.titleInput}/>
        </View>
        <View>
            <TextInput
                placeholder="content" onChangeText={contentChangeHandle} 
                style={styles.contentInput}
                multiline={true}/>
        </View>
        <Pressable onPress={PressHandle} style={styles.button}>
        <CButton>등록</CButton>
        </Pressable>
    </View>);
}

const styles = StyleSheet.create({
    titleInput:{
        borderBottomWidth:1,
        height:50,
        borderBottomColor:"steelblue",
        marginHorizontal:15,
        marginBottom:20,
        padding:5
    },
    contentInput:{
        backgroundColor:"#d3d3d3",
        marginHorizontal:15,
        height:300,
        marginBottom:20,
        borderRadius:20,
        paddingTop:20,
        paddingHorizontal:20
    },
    button:{
        alignItems:"flex-end",
        marginRight:10
    }
});
export default Input;