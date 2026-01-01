import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./components/Products";
import Tickets from "./components/Tickets";
import Form from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/form" element={<Form />} />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
