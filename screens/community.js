import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { View, Text, Button, FlatList, Pressable, StyleSheet } from "react-native";
import { AppContext } from "../context/app-context";
import Content from "../components/content";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Font from "../components/Font";
import { sendRegisterReq } from "../util/accounts";
import CButton from "../components/customButton";
function Comunity() {

    const navigation = useNavigation();
    const [reads, setReads] = useState([]);
    const ctx = useContext(AppContext);

    console.log("CTX.refresh!! " ,ctx.refresh);


    useEffect(() => {
        
        async function read() {
            const res = await axios.get(`https://with-2aba0-default-rtdb.asia-southeast1.firebasedatabase.app/blah.json`).then(res => {setReads(res.data)
            ctx.setinfoData(res.data)}
            )
        }
        read();
        if(!ctx.refresh){
            ctx.setRefresh(true);
        }
        
    }, [ctx.refresh])



    let rst = Object.keys(reads).map((one) => {
        let newData = reads[one];
        newData.id = one;
        return newData;
    });

    rst.reverse();
    //  <CButton style={{flex:1}} >글쓰기</CButton>

    const pressHandle = () => {
        //글쓰기로 바로가기
        navigation.navigate("Write")
    }


    return (<View style={{ flex: 1 }}>
        <View style={styles.titleText}>
            <Font style={{ flex: 1 }}>
                커뮤니티 홈
            </Font>
            <Pressable onPress={pressHandle}>
               <CButton>글쓰기</CButton>
            </Pressable>
        </View>

        <View style={{ flex: 1 }}>

            <FlatList
                data={rst}
                keyExtractor={(one) => one.id}
                renderItem={({ item, index }) => {
                    return <Content item={item} navigation={navigation} />
                }}
            />
        </View>
    </View>);
}

const styles = StyleSheet.create({
    titleText: {
        flexDirection: "row",
        justifyContent: "space-between"

    }
});

export default Comunity;