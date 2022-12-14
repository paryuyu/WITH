import axios from "axios";


//firebase로 axios(fetch) 붙여주기.
//firebase의 내 프로젝트 설정에 있는 키값
let APP_KEY = process.env.GOOGLE_APP_KEY;

export async function sendRegisterReq(email, password) {
    //회원가입쪽 url(endPoint)
    console.log(APP_KEY)
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APP_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true
    });

    return response.data;
}

export async function sendLoginReq(email, password) {
    //로그인 url(endPoint)
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APP_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true
    });

    return response.data;
}
