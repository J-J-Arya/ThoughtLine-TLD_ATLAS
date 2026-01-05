import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "../pages/Splash/Splash";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Home from "../pages/Home/Home";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails";
import AddProject from "../pages/AddProject/AddProject"; 
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash */}
        <Route path="/" element={<Splash />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* App */}
        <Route path="/home" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/add-project" element={<AddProject />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
