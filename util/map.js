import axios from "axios";

const GoogleAppKey = "AIzaSyDV3uZd-vG6qkk2LPNp9He_fT0z7kobMFo";
export default function createStaticMap(lat,lng) {

    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=20&size=800x450&markers=size:mid%7Ccolor:green%7Clabel:S%7C${lat},${lng}&key=${GoogleAppKey}`
}


export async function getAddresses(lat, lng){
    const endPoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GoogleAppKey}&language=ko`;
    const response = await axios.get(endPoint);
    //console.log(response.data.results[0]);

    return response.data.results[0];
}
