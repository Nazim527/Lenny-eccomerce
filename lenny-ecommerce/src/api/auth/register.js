import { instance } from "..";

export const register = async (registerObj) => {
    const res = await instance.post('/auth/local/register',
    JSON.stringify(registerObj),
    )
    return res.data
}