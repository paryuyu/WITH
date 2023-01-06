import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";
function Content({ item, navigation }) {

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
                    <Text style={styles.itemHeaderText}>{item.owner}</Text>
                    <Text style={styles.itemHeaderText}>{item.createdAt.slice(0, 10)}</Text>
                </View>
                <Text style={styles.itemtitle}>{item.title}</Text>
                <Text style={styles.itemContent}>{item.content}</Text>
            </View>
        </Pressable>);
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

export default Content;