import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoutes";


const AppRouter = () => {
    return (
        <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          
          <Route path="*" element={<h1>Página não encontrada</h1>} />
          
          
		</Routes>
      </Router>
    );
}
 
export default AppRouter;