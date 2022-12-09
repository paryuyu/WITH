import { useContext, useEffect } from "react";
import { View, Text, Button, TextInput, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CButton from "../components/customButton";
import MyText from "../components/myText";
import { AppContext } from "../context/app-context";
import Font from "../components/Font";
import { useNavigation } from "@react-navigation/native";
function Info() {

  let navigation = useNavigation();
  const ctx = useContext(AppContext)

  let rst = Object.keys(ctx.infoData).map((one) => {
    let newinfo = ctx.infoData[one];
    newinfo.id = one;
    return newinfo;
  })

  return (
    <View style={{flex:1}}>
      <View><Font>{ctx.value.email}</Font></View>
      <FlatList data={rst}
        keyExtractor={(one) => { one.id }}
        renderItem={({ item, index }) => { return <MyText item={item} navigation={navigation}/> }}
      />
    </View>);
}

export default Info;