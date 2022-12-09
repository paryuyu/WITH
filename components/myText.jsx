import { useContext, useEffect } from "react";
import { View, Text, StyleSheet ,Pressable} from "react-native";
import { AppContext } from "../context/app-context";

function MyText({ item, navigation }) {
    const ctx = useContext(AppContext)
   
    let title;
    let content;
    let createdAt;
    if (item.owner == ctx.value.email) {
        title = (<View><Text>{item.title}</Text></View>)
        content = (<View><Text>{item.content}</Text></View>)
        createdAt = (<View><Text>{item.createdAt.slice(0,10)}</Text></View>)
    }

    const pressDetailHandle = () => {
        //디테일 컴포넌트 만들어서 stack에 추가하고 디테일로 네비게이트해서 보내주기.
        if (item.id) {
            navigation.navigate("detail", { tag: item })
        }
    }
    return (
    <Pressable onPress={pressDetailHandle}>
        <View style={styles.itemBox}>
        <View style={styles.itmeHeader}>
            <Text style={styles.itemHeaderText}>{createdAt}</Text>
        </View>
            <Text style={styles.itemtitle}>{title}</Text>
            <Text style={styles.itemContent}>{content}</Text>
        </View>
        </Pressable>

    );
}



const styles = StyleSheet.create({
    itemBox: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 18,
        borderColor: "#d0d0d0",
        marginHorizontal: 10,
        marginBottom: 5,
        padding: 10
    },
    itmeHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemHeaderText: {
        fontSize: 12,
        color: "grey"
    },
    itemtitle: {
        fontSize: 16,
        marginVertical: 5,
        fontWeight: "bold",
        color: "steelblue"
    },
    itemContent: {
        color: "#00111a"
    }
});

export default MyText;