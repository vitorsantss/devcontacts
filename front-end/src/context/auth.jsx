/* eslint-disable react/prop-types */
import { api } from "@/services/api";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.error) {
        return response.data.error;
      } else {
        setUser(response.data.dados);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem("@Auth:token", response.data.token);
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.dados));
      }
    } catch (error) {
      return error;
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
