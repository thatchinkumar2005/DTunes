import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./ui/layout/publicLayout";
import LoginPage from "./pages/authentication/LoginPage";
import NotFoundPage from "./pages/general/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="auth" element={<PublicLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
