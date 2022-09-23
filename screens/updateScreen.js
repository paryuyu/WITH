import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { View, Text, TextInput, Button ,StyleSheet, Pressable } from "react-native";
import CButton from "../components/customButton";
import { AppContext } from "../context/app-context";
import { Update } from "../util/content";
function UpdateInput({route}) {

const[title,setTitle] = useState("");
const[content,setContent] = useState("");
const ctx = useContext(AppContext);
const navigation = useNavigation();
const {tag} = route.params;

useEffect(()=>{
    setTitle(tag.title)
    setContent(tag.content)
},[])
    /**제목수정 */
    const titleChangeHandle = (val) => {
        setTitle(val)
    }

    /**내용수정 */
    const contentChangeHandle = (val) => {
        setContent(val)
    }

    
    const PressHandle = () => {
        ctx.setRefresh(false);
        !async function () {
            try {
               // console.log(title, content,  ctx.value.email,ctx.value.idToken);
                const recv = await Update(title, content, new Date(), ctx.value.email, ctx.value.idToken, tag.id);
                navigation.navigate("Community");
            } catch (err) {
                console.log(err)
            }
        }();

    }

    

    return (<View>
        <View>
            <TextInput
                placeholder="title" onChangeText={titleChangeHandle} 
                style={styles.titleInput}
                value={title}
                />
        </View>
        <View>
            <TextInput
                placeholder="content" onChangeText={contentChangeHandle} 
                style={styles.contentInput}
                multiline={true}
                value={content}
                />
        </View>
        <Pressable onPress={PressHandle} style={styles.button}>
        <CButton>수정하기</CButton>
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
        alignItems:"center",
        marginRight:10
    }
});
export default UpdateInput;