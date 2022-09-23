import { useContext } from "react";
import { View,Text,Button ,TextInput, Pressable} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CButton from "../components/customButton";
import { AppContext } from "../context/app-context";
function Info() {
const ctx = useContext(AppContext)
let rst = Object.keys(ctx.infoData).map((one)=>{
  let newinfo = ctx.infoData[one];
  newinfo.id = one;
  return newinfo;
})

  const pressHandle = () =>{
   //내가 쓴 글만 보여주기.
  }



    return ( 
    <View>
      <View><Text>{ctx.value.email}</Text></View>
      <FlatList/>
      <Pressable onPress={pressHandle}><CButton>내가 쓴 글 보기</CButton></Pressable>
      

    </View> );
}

export default Info;