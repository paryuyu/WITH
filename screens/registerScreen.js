import { useState } from "react";
import { View, TextInput, Button, Text, ActivityIndicator, Alert ,StyleSheet} from "react-native";
import React from "react";
import { sendRegisterReq } from "../util/accounts";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
function Register() {
    //스피너생성
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordChk, setPasswordChk] = useState("");
    const [emailChk, setEmailChk] = useState(null);

    const navigation = useNavigation()
    const registerHandle = () => {
        setLoading(true)
        //스피너생성
        !async function () {
            try {
                console.log(email)
                console.log(password)
                console.log(passwordChk)
                //이메일 정규식
                let emailPatternChk = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{3}$/i;
                if (emailPatternChk.test(email)) {
                    setEmailChk(true)
                } else {
                    setEmailChk(false)
                }
                console.log(emailChk)

                if (passwordChk === password && emailChk == true) {
                    const recv = await sendRegisterReq(email, password)
                    Alert.alert(
                        "Alert Title",
                        "회원가입이 완료되었습니다.",
                        [
                            {
                                text: "OK", onPress: () =>
                                    navigation.navigate("Home")
                            },
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            }
                        ])
                    setEmail("")
                } else {
                    Alert.alert("With", "이메일 및 비밀번호를 다시 확인해주세요.")
                }

            } catch (err) {
                console.log(err)
                Alert.alert("With", "회원가입이 처리되지 않았습니다. 다시 시도해주세요.")
            }


            setLoading(false)
        }();


    }

    if (loading) {
        //스피너생성
        return <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator size={36} /></View>
    }






    const emailHandle = (val) => {
        setEmail(val)
    }



    const passwordInputHandle = (val) => {
        setPassword(val)
    }

    const passwordChkHandle = (val) => {
        setPasswordChk(val)
    }



    return (<View style={styles.outline}>
        <View style={styles.inputOutBox}>
        <View style={styles.inputBox}>
            <Text>이메일</Text>
            <TextInput
            style={styles.input}
                placeholder="email"
                onChangeText={emailHandle}
                autoCapitalize="none"
                value={email}
                keyboardType="email-address" />
        </View>

        <View style={styles.inputBox}>
            <Text>비밀번호</Text>
            <TextInput placeholder="password" secureTextEntry={true} onChangeText={passwordInputHandle}  style={styles.input}/>
        </View>
        <View style={styles.inputBox}>
            <Text>비밀번호 확인</Text>
            <TextInput placeholder="password Check" secureTextEntry={true} onChangeText={passwordChkHandle}  style={styles.input}/>
        </View>
        <View>
            <Button title="회원가입" onPress={registerHandle} />
        </View>
        </View>

    </View>);

}

const styles = StyleSheet.create({
    outline:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      
    },
    inputOutBox:{
        backgroundColor:"white",
        padding:30,
        borderRadius:20,
        borderWidth:5,
        borderColor:"steelblue"
    },
    inputBox:{
        marginVertical:10
    },
    input:{
        height:50,
        width:200,
        alignContent:"center",
        borderBottomWidth:1,
        borderBottomColor:"grey",
        //paddingHorizontal:20,
        fontSize:15,
       // marginHorizontal:15,
        marginBottom:10
    }
});

export default Register;