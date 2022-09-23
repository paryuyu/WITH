//인증토큰값 context로 만들기.
//토큰값이 앱전반에 사용될 가능성이 큼.

import { createContext, useEffect, useReducer, useState} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { View ,ActivityIndicator} from "react-native";

export const AppContext = createContext({});

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
    const [refresh, setRefresh] =useState(false);    
    const [infoData, setinfoData] =useState([]);    
    useEffect(()=>{ 
    //이거 자체가 비동기
    AsyncStorage.getItem("authentication").then((data)=>{
        if(data){
            dispatch({type:"login", payload:JSON.parse(data)})
        }
        setDone(true);
    })
    },[])

    if(!done){
        return <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator size={36} /></View>
    }

    function login(data) {
        setAuth(data);
    };

    function logout() {
        setAuth(null);
    };

    return (<AppContext.Provider value={{value: auth, dispatch,refresh, setRefresh ,infoData, setinfoData}}>
        {children}
    </AppContext.Provider>);
}