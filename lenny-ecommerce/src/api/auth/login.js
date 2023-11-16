import axios from "axios";
import { instance } from "..";

export const login = async (logObj,Logtoken) => {
  const res = await axios.post(
    "http://localhost:1337/api/auth/local",
    JSON.stringify(logObj),
    {
      headers: {
        Authorization:
          "bearer " + `${Logtoken}`,
          "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
