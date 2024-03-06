import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"



const PrivateRoute = () => {
    const { signed } = useContext(AuthContext)
    
    return signed ? <Outlet /> : <Navigate to="/login"/> 
}
 
export default PrivateRoute;