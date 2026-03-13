import './App.css' 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
 
import Home from "./pages/Home"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import AdminLinks from "./pages/AdminLinks"; 
import ManageUsers from "./pages/ManageUsers"; 
import UserLinks from "./pages/UserLinks"; 
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import AdminLayout from "./layouts/AdminLayout";
 
function App() { 
  return ( 
    <BrowserRouter> 
      <Routes> 
        <Route path="/auth" element={<PublicLayout />} >
          <Route path="register" element={<Register />} /> 
          <Route path="login" element={<Login />} /> 
        </Route>
        <Route path="/" element={<PrivateLayout />}> 
          <Route index element={<Home />} /> 
          <Route path="user-links" element={<UserLinks />} /> 
        </Route>
        <Route path="/admin" element={<AdminLayout />} > 
          <Route path="links" element={<AdminLinks />} /> 
          <Route path="users" element={<ManageUsers />} /> 
        </Route>
        
      </Routes> 
    </BrowserRouter> 
  ); 
} 
 
export default App; 

 

 

