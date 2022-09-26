import { useContext, useEffect } from "react";
import { View, Text, Button, TextInput, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CButton from "../components/customButton";
import MyText from "../components/myText";
import { AppContext } from "../context/app-context";
function Info() {

  const ctx = useContext(AppContext)

  let rst = Object.keys(ctx.infoData).map((one) => {
    let newinfo = ctx.infoData[one];
    newinfo.id = one;
    return newinfo;
  })

  if(ctx.refresh){
    ctx.setRefresh(false)
  }
  return (
    <View>
      <View><Text>{ctx.value.email}</Text></View>
      <FlatList data={rst}
        keyExtractor={(one) => { one.id }}
        renderItem={({ item, index }) => { return <MyText item={item} /> }}
      />
    </View>);
}

export default Info;