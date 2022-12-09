import { View, Pressable, StyleSheet, TouchableOpacity, Alert,Image ,Text} from "react-native";
import { launchCameraAsync, useCameraPermissions,useMediaLibraryPermissions, PermissionStatus , launchImageLibraryAsync} from "expo-image-picker"
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext, useState } from "react";
import { AppContext } from "../context/app-context";


export default function ImgPicker() {
    /**status = 상태값, requestPermission는 권한요청*/
    const [imgUri, setImgUri] = useState(null);
    const [cameraStatus, requestCameraPermission] = useCameraPermissions();
    const [albumStatus, requestAlbumPermission] = useMediaLibraryPermissions();
    const ctx = useContext(AppContext);
    const cameraPress = async () => {
        try {
            if (cameraStatus.status === PermissionStatus.DENIED || cameraStatus.status === PermissionStatus.UNDETERMINED) {
                const resp = await requestCameraPermission();

                if (!resp.granted) {
                    Alert.alert("With", "카메라 접근권한이 필요합니다.");
                    return;
                }

            }
        } catch (err) {
            console.log(err)
            return;
        }

        /** {"canAskAgain": true, "expires": "never", "granted": true, "status": "granted"} */
        console.log(cameraStatus, "카메라 상태");

        /**권한요청 : 권한코드가 무조건 들어가야함*/
        requestCameraPermission();

        const rst = await launchCameraAsync({
            quality: 0.5,
            allowsEditing: true,
            aspect: [4,3],

            /**사진이 가지고 있는 정보값*/
            exif:true,

            /**base64: 인코딩방식인데 파일의 byte를 가지고 문자열로 바꿔주는 것.*/
            base64:true
        });
       

       
        if(!rst.cancelled){

            setImgUri(rst.uri);
            imagePickHandle(rst.uri);
            ctx.setPlaceImg(rst.uri);
            ctx.setPlaceImgBase64(rst.base64);
           
        }
    }

     

    const albumPress = async() => {

        try{
           if(albumStatus.status === PermissionStatus.DENIED || cameraStatus.status === PermissionStatus.UNDETERMINED){
            const res = await requestAlbumPermission();

            if (!res.granted) {
                Alert.alert("With", "사진앨범 접근권한이 필요합니다.");
                return;
            }

           }

        }catch(err){
            console.log(err);
            return;
        }


        /**권한요청 */
        requestAlbumPermission();


        const rst = await launchImageLibraryAsync({
            quality: 0.5,
            allowsEditing: true,
            aspect: [16, 9],
            exif:true,
            base64:true
        });


        if(!rst.cancelled){
            setImgUri(rst.uri);
            ctx.setPlaceImg(rst.uri);
            ctx.setPlaceImgBase64(rst.base64);
        }

    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.imagePreviewBox}>
                {imgUri && <Image source={{uri: imgUri}} style={{flex:1}}/> }
            </View>
            <View style={styles.photoiconBox} >

                <TouchableOpacity onPress={cameraPress}>
                    <Icon name="camera-outline" size={30} color="steelblue"></Icon>
                </TouchableOpacity>

                <TouchableOpacity onPress={albumPress}>
                    <Icon name="images-outline" size={30} color="steelblue"></Icon>
                </TouchableOpacity>
            </View>
        </View>);
}


const styles = StyleSheet.create({
    imagePreviewBox: {
        flex: 1,
        backgroundColor: "white",
        maxHeight: 250,
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent:"center",
        borderRadius:10
      
    },
    photoiconBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20
    },
    text:{
        flex:1,
       
    }
});