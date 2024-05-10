import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  //console.log(auth)

  const loginUser = async(formData)=>{
      const res = await axios.post(`/api/user/login`, formData);
      setUser(res.data.user);
      localStorage.setItem('session_token', res.data.token);
      fetchUser(); // Llama a fetchUser después de establecer el token
  }

  const logOut = async()=>{
    const res = await axios.get(`/api/user/logOut`);
    localStorage.removeItem('session_token'); 
  }

  useEffect(()=>{
    const storedToken = localStorage.getItem('session_token')//guarda el inicio de sesion
    if(storedToken){
        fetchUser();
    }
  },[])

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/user/getUser`);
      setUser(res.data.user);
    } catch (error) {
      console.error("Error al obtener la información del usuario");
      localStorage.removeItem('session_token');
    }
  };

  return (
    <authContext.Provider value={{ user, setUser, loginUser, logOut }}>
      {children}
    </authContext.Provider>
  );
};

export const useUser = () => useContext(authContext);
