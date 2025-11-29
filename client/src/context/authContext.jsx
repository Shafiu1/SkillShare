import { createContext,useState,useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser]=useState(null);
    const [token,setToken]=useState(()=>localStorage.getItem("token"));

    const login = (userData,jwtToken)=>{
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem("token",jwtToken);
    }

    const logout = ()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItemItem("token")
    }

    const value = {user,token,login,logout};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};