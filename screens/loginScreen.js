import { useNavigation } from "@react-navigation/native";
import { useContext, useState ,useEffect} from "react";
import { View, Text, TextInput, Button, Pressable, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { sendLoginReq } from "../util/accounts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Ionicons';
import { AppContext } from "../context/app-context";
import CButton from "../components/customButton"
function Login() {



    useEffect(()=>{
        console.log(process.env.GOOGLE_APP_KEY)
    
      },[])

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    //로그인할 때 아이디 토큰 저장하기.
    const navigation = useNavigation();

    //컨텍스트 사용법
    const ctx = useContext(AppContext);

    const loginHandle = () => {
        !async function () {
            try {
                const recv = await sendLoginReq(email, password);
                ctx.dispatch({ type: "login", payload: recv })
                AsyncStorage.setItem("authentication", JSON.stringify(recv));
                Alert.alert("With", "로그인성공");
                navigation.navigate("Home");


            } catch (err) {
                console.log(err);
                Alert.alert("With", "로그인이 처리되지 않았습니다. 다시 시도해주세요.");
                setLoading(true);
            };

            setLoading(true);
        }();
        //즉시실행함수를 쓰는 이유는 useEffect는 비동기함수를 넘겨주지 말라고 하니까 이렇게 한거. 그냥 async 함수로 했어도 됐을듯.
    }


    if (loading) {
        return <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator size={36} /></View>
    }

    const moveRegisterHandle = () => {
        Alert.alert(
            "Alert Title",
            "회원가입화면으로 이동하시겠습니까?",
            [
                {
                    text: "OK", onPress: () =>
                        navigation.navigate("Register")
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
                }
            ])

    }

    const emailHandle = (val) => {
        setEmail(val)
    }

    const passwordHandle = (val) => {
        setPassword(val)
    }

    //secureTextEntry={true} type password 처럼 만들기
    return (<View style={{ flex: 1 }}>

        <View style={styles.outline}>
            <View style={styles.inputOut}>
                <TextInput placeholder="email" onChangeText={emailHandle} style={styles.input} />
                <TextInput placeholder="password" secureTextEntry={true} onChangeText={passwordHandle} style={styles.input}/>
                <View style={styles.button}>
                    <Pressable onPress={loginHandle}>
                        <CButton>로그인</CButton>
                    </Pressable>
                </View>
            </View>
            <Pressable style={styles.textNavi}>
                <Text onPress={moveRegisterHandle}>새로운 계정이 필요하신가요?</Text>
            </Pressable>
        </View>

    </View>);
}

const styles = StyleSheet.create({
    inputOut: {
        backgroundColor: "white",
        padding: 30,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: "steelblue"
    },
    outline: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        marginHorizontal: 30,

    },
    input: {
        height: 50,
        alignContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        paddingHorizontal: 20,
        fontSize: 15,
        marginHorizontal: 15,
        marginBottom: 10
    },
    textNavi: {
        alignItems: "center",
        marginVertical: 20,
    },
    button: {
        marginTop: 20
    }

});

export default Login;