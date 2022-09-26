const GoogleAppKey = "AIzaSyDV3uZd-vG6qkk2LPNp9He_fT0z7kobMFo";
export default function createStaticMap(lat,lng) {

    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=20&size=800x450&markers=size:mid%7Ccolor:green%7Clabel:S%7C${lat},${lng}&key=AIzaSyDV3uZd-vG6qkk2LPNp9He_fT0z7kobMFo`
}

