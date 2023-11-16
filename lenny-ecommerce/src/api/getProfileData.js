import { instance } from "."

export const getProfileUserData =async (logToken) => {
    const res = await instance.get("/users/me", {
        headers: {
            Authorization: `bearer ${logToken}`
        }
    })
    
    return res.data
}