import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppContext, AppContextProvider } from './context/app-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './screens/homeScreen';
import Login from './screens/loginScreen';
import Register from './screens/registerScreen';
import Profile from './screens/profileScreen';
import Info from './screens/infoScreen';
import { useContext, useEffect } from 'react';
import Comunity from './screens/community';
import CommunityInput from "./screens/comunityinput"
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import Detail from './screens/detail';
import UpdateInput from "./screens/updateScreen";
import PlaceAddScreens from './screens/placeAddScreen';
import ChooseLocationScreen from './screens/chooseLocationScreen';
import PlaceScreen from './screens/placeScreen';
import PlaceDetail from './components/placeDetail';

const topTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CommunityStack() {







  return (
    <Stack.Navigator >
      <Stack.Screen name="Community" component={Comunity} options={{headerTintColor:"steelblue"}} />
      <Stack.Screen name='Write' component={CommunityInput} options={{ presentation: "modal" ,headerTintColor:"steelblue" }} />
      <Stack.Screen name='detail' component={Detail} options={{ presentation: "modal" ,headerTintColor:"steelblue"}} />
      <Stack.Screen name='update' component={UpdateInput} options={{ presentation: "modal" ,headerTintColor:"steelblue"}} />
    </Stack.Navigator>
  )
}

function PlaceStack(){
  return (
    <Stack.Navigator >
      <Stack.Screen name="placeHome" component={PlaceScreen}  options={{ presentation:"modal", headerTintColor:"steelblue"}} />
      <Stack.Screen name="place" component={PlaceAddScreens}  options={{ presentation:"modal", headerTintColor:"steelblue"}} />
      <Stack.Screen name="chooseLocation" component={ChooseLocationScreen}  options={{ presentation: "modal" ,headerTintColor:"steelblue"}} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail}  options={{ presentation: "modal" ,headerTintColor:"steelblue"}} />
    </Stack.Navigator>
  )
}


function GuestDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={Login} options={{headerTintColor:"steelblue"}}/>
      <Drawer.Screen name="Register" component={Register} options={{headerTintColor:"steelblue"}} />
    </Drawer.Navigator>
  );
}

function MemberDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile} options={{headerTintColor:"steelblue"}}/>
      <Drawer.Screen name="InfoHome" component={Info} options={{headerTintColor:"steelblue"}}/>
    </Drawer.Navigator>
  );
}



//firebase
//firebase 의 데이터베이스 활용(서버구축을 하지 않아도 회원가입이랑 로그인 처리를 해줌)
//구글로 로그인
//프로젝트생성
//Authentication -> 이메일/비밀번호 사용(사용설정)
//문서 - REST - Authentication and User Management 
//엔드포인트 : https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]

//AXIOS
//FETCH랑 똑같음.(axios)
//https://axios-http.com/kr/docs/intro
//npm install axios 설치



function BottomTab() {
  const ctx = useContext(AppContext);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarActiveTintColor: "steelblue", unmountOnBlur: true, tabBarInactiveTintColor: "grey", tabBarIcon: ({ focused, color, size }) => { return <Icon name={focused ? "home" : "home-outline"} size={20} color="steelblue"></Icon> } }} />

      {ctx.value? 
      <Tab.Screen name="Comunity" component={CommunityStack} options={{ headerShown: false, tabBarActiveTintColor: "steelblue", tabBarInactiveTintColor: "grey", tabBarIcon: ({ focused, color, size }) => { return <Icon name={focused ? "chatbubbles" : "chatbubbles-outline"} size={20} color="steelblue" ></Icon> } }} />
      :null}

      <Tab.Screen name="Place" component={PlaceStack} options={{ headerShown: false, tabBarActiveTintColor: "steelblue", tabBarInactiveTintColor: "grey", tabBarIcon: ({ focused, color, size }) => { return <Icon name={focused ? "navigate" : "navigate-outline"} size={20} color="steelblue" ></Icon> } }} />
   
      <Tab.Screen name="setting" component={ctx.value ? MemberDrawer : GuestDrawer} options={{ headerShown: false, tabBarActiveTintColor: "steelblue", tabBarInactiveTintColor: "grey", tabBarIcon: ({ focused, color, size }) => { return <Icon name={focused ? "settings" : "settings-outline"} size={20} color="steelblue" ></Icon> } }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppContextProvider>
        <NavigationContainer>
          <BottomTab />
        </NavigationContainer>
      </AppContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
