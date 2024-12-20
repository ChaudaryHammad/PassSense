import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Guide from "./screens/Guide";
import Home from "./screens/Home";
import ScanPassport from "./screens/ScanPassport";
import MyScan from "./screens/MyScan.jsx";

import Navbar from "./components/NavBar";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import { PrivateRoutes } from "./utils/routes.jsx";
import Verification from "./screens/Verification.jsx";
import ForgetPassword from "./screens/ForgetPassword.jsx";
import ResetPassword from "./screens/ResetPassword.jsx";

function App() {
  const location = useLocation();

  // Define the paths where you don't want to show the Navbar
  const hideNavbarRoutes = ["/login", "/signup","/verify",'/forget-password'];

  return (
    <>
     
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div className="pt-20 min-h-screen container mx-auto">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/guide" element={<Guide />} />

          <Route element={<PrivateRoutes />}>
          <Route path="/scan" element={<ScanPassport />} />
       
          </Route>

          <Route element={<PrivateRoutes />}>
         
          <Route path="/passports" element={<MyScan />} />
       
          </Route>
        

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-passsword/:token" element={<ResetPassword />} />


          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verification />} />


          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
