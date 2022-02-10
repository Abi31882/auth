import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Chatlist from "./components/chatlist/Chatlist";
import Chatscreen from "./components/chatscreen/Chatscreen";
import AuthProvider from "./context/Auth";
import PrivateRoute from "./PrivateRoute";
import { Video } from "./components/videocall/video";

const Routing = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/chatlist" element={<Chatlist />} />
          </Route>
          <Route path="/chatscreen/:id" element={<Chatscreen />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routing;
