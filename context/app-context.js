//인증토큰값 context로 만들기.
//토큰값이 앱전반에 사용될 가능성이 큼.

import { createContext, useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export const AppContext = createContext({});
export const PlaceContext = createContext({});

const authReducer = (state = null, action) => {
    switch (action.type) {
        case "login":
            return action.payload;

        case "logout":
            return null;
    }
    //디폴트값
    return null;
}


//컴포넌트 생성
export function AppContextProvider({ children }) {

    const [auth, dispatch] = useReducer(authReducer, null);
    const [done, setDone] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [infoData, setinfoData] = useState([]);

    const [placeInfo, setPlaceInfo] = useState(""); // 장소설명
    const [placeImg, setPlaceImg] = useState(null);
    const [placeLocation, setPlaceLocation] = useState(null);
    const [placeImgBase64,setPlaceImgBase64] = useState(null);
    const [address, setAddress] = useState("");
    const [mark, setMark] =useState(null);
    //console.log(placeInfo,placeImg,placeLocation, "컨텍스트")
    //console.log("!!!!",placeImgBase64,"!!!!")

    useEffect(() => {
        //이거 자체가 비동기
        AsyncStorage.getItem("authentication").then((data) => {
            if (data) {
                dispatch({ type: "login", payload: JSON.parse(data) })
            }
            setDone(true);
        })
    }, [])

    if (!done) {
        return <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator size={36} /></View>
    }

    function login(data) {
        setAuth(data);
    };

    function logout() {
        setAuth(null);
    };

    return (<AppContext.Provider value={{ value: auth, dispatch, refresh, setRefresh, infoData, setinfoData, setPlaceInfo, placeInfo, setPlaceImg, placeImg, setPlaceLocation, placeLocation,placeImgBase64,setPlaceImgBase64 ,address, setAddress,mark, setMark}}>
        {children}
    </AppContext.Provider>);
}



export function PlaceContextProvider({children}){
    /**이건 등록할 때 넣어주는 uri */
    const [staticMapUri, setStaticMapUri] = useState("")

return(<PlaceContext.Provider value={{staticMapUri, setStaticMapUri}}>{children}</PlaceContext.Provider>)

}