import './App.css' 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
 
import Home from "./pages/Home"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import AdminLinks from "./pages/AdminLinks"; 
import ManageUsers from "./pages/ManageUsers"; 
import UserLinks from "./pages/UserLinks"; 
 
function App() { 
  return ( 
    <BrowserRouter> 
      <Routes> 
 
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/admin-links" element={<AdminLinks />} /> 
        <Route path="/manage-users" element={<ManageUsers />} /> 
        <Route path="/user-links" element={<UserLinks />} /> 
 
      </Routes> 
    </BrowserRouter> 
  ); 
} 
 
export default App; 

 

 

