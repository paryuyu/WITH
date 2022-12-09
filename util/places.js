import axios from "axios";
import { Buffer } from "buffer";
/**1. 파일업로드(firebase - storage에 전송 - binary형태로 전송)
 * 2. 데이터저장(realtime storage 토큰정보를 database에 저장)
 */
export async function sendAddPlaceReq(placeData, fileData, token, email, address) {

    let filename = Date.now().toString();
    //1. 파일업로드(firebase - storage에 전송 - binary형태로 전송)
    /**firebase-Storage => url임 */
    const endPoint = `https://firebasestorage.googleapis.com/v0/b/with-2aba0.appspot.com/o/${filename}`;

    const uploadRst = await axios({
        url: endPoint,
        headers: {
            "Content-type": "image/jpeg"
        },
        /**우리가 받아온 byte가 base64라서 이렇게 보내주면 binary에서 변환?해주는거임. */
        data: Buffer.from(fileData, "base64"),
        method: "post"
    });

    console.log(placeData);
    //placeData 결과값 => {"fileUri": "file:///var/mobile/Containers/Data/Application/22EC584C-0C78-40A9-94FA-6A5944DAF04B/Library/Caches/ExponentExperienceData/%2540anonymous%252FWITH-d87f5b41-2dd3-4ea2-a149-dc685796fa0c/ImagePicker/C4079BF0-519D-4514-8AD4-D547741F7000.jpg", "location": {"latitude": 35.36741453831457, "longitude": 126.70339571868686}, "title": ""}



    // 2. 데이터저장(realtime storage 토큰정보를 database에 저장)
    const placeItem = { ...placeData, imageURL: endPoint + "?alt=media", email: email, createdAt: new Date(), placeAddress: address }

    const response = await axios.post(`https://with-2aba0-default-rtdb.asia-southeast1.firebasedatabase.app/place.json?auth=${token}`, {
        placeItem: placeItem
    });


}


export async function PlaceDelete(token, id ) {
 
    const response = await axios.delete(`https://with-2aba0-default-rtdb.asia-southeast1.firebasedatabase.app/place/${id}.json?auth=${token}`);

    return response.data;
}


