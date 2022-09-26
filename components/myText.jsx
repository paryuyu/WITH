import { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { AppContext } from "../context/app-context";

function MyText({ item }) {
    const ctx = useContext(AppContext)
    console.log(ctx)
    

    let title;
    let content;
    let createdAt;
    if (item.owner == ctx.value.email) {
        title = (<View><Text>{item.title}</Text></View>)
        content = (<View><Text>{item.content}</Text></View>)
        createdAt = (<View><Text>{item.createdAt.slice(0,10)}</Text></View>)
    }

    const pressDetailHandle = () => {

    }


    return (<View>
        <View>
            <Text>{createdAt}</Text>
        </View>
        <View >
            <Text>{title}</Text>
        </View>
        <View>
            <Text>{content}</Text>
        </View>

    </View>

    );
}

export default MyText;