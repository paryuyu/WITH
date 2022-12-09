import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View ,Text} from "react-native";
import Input from "../components/input";


function CommunityInput() {
   const navigation =  useNavigation();
   //등록하는 fetch
    return ( <View>
        <Input navigation={navigation}/>
    </View> );
}

export default CommunityInput;