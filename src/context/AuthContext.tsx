import React, { createContext, useState } from "react";
import axios from "../axios";
const AuthContext: any = createContext("");
function setCookie(c_name: any, value: any, exdays: any) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  const c_value =
    escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

export const AuthContextProvider = (props: any) => {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState<any>([]);
  const [site_data, set_site_data] = useState<any>([]);
  const HandleLogin = (type: any) => {
    setLogged(type);
  };
  const HandleToken = (data: any) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + data;
    setCookie("token", data, 3);
    setToken(data);
  };
  const HandleUser = (data: any) => {
    setUser(data);
  };
  const HandleData = (data: any) => {
    console.log("->", data);
    set_site_data(data);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        logged,
        user,
        site_data,
        HandleLogin,
        HandleToken,
        HandleUser,
        HandleData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
