import {createAsyncThunk} from "@reduxjs/toolkit"
import  { register }  from "../../../../api/auth/register"
import { login } from "../../../../api/auth/login"

//!Register
export const fetchAuthRegister = createAsyncThunk(
    "auth/fetchAuthRegister",
    async (regObj, {rejectWithValue}) => {
        try {
            const result = await register(regObj)

            return result
        } catch (error) {
            return rejectWithValue("Qeydiyyat olarken xeta bas verdi!")
        }
    } 
)

//! Login auth
export const fetchAuthLogin = createAsyncThunk(
    "auth/fetchAuthLogin",
    async ({data, Logtoken}, {rejectWithValue}) => {
        try {
            const result = await login(data, Logtoken)

            return result
        } catch (error) {
            return rejectWithValue("Daxil Loginde olarken xeta bas verdi!")
        }
    } 
)