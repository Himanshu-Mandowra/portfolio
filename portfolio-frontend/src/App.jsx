import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./components/Admin-data";
import ProtectedRoute from "./components/ProtectedRoute";
import RequiemLoader from "./components/RequiemLoader";
import UmbrellaTransition from "./components/UmbrellaTransition";
import HomePage from "./pages/HomePage";

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [revealReady, setRevealReady] = useState(false);

  return (
    <BrowserRouter>
      {!bootComplete && (
        <RequiemLoader
          onStartReveal={() => setRevealReady(true)}
          onComplete={() => {
            setRevealReady(true);
            setBootComplete(true);
          }}
        />
      )}
      <UmbrellaTransition />
      <Routes>
        <Route path="/" element={<HomePage revealReady={revealReady} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
