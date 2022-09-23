import axios from "axios";

//쓰기권한 설정

/**리얼타임 등록 */
export async function Write(title,content, createdAt, owner,token ) {
 
    const response = await axios.post(`https://with-2aba0-default-rtdb.asia-southeast1.firebasedatabase.app/blah.json?auth=${token}`, {
        title: title,
        content: content,
        createdAt: createdAt,
        owner: owner
    });

    return response.data;
}

/**리얼타임 업데이트 */
export async function Update(title,content, createdAt, owner,token, id ) {
 
    const response = await axios.put(`https://with-2aba0-default-rtdb.asia-southeast1.firebasedatabase.app/blah/${id}.json?auth=${token}`, {
        title: title,
        content: content,
        createdAt: createdAt,
        owner: owner
    });

    return response.data;
}



/**리얼타임 삭제*/
export async function Delete(token, id ) {
 
    const response = await axios.delete(`https://with-2aba0-default-rtdb.asia-southeast1.firebasedatabase.app/blah/${id}.json?auth=${token}`);

    return response.data;
}
