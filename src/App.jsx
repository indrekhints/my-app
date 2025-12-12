import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import LandingPage from "./pages/LandingPage"
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import UserArea from "./pages/userArea";




function App() {




  return (
    <>  <Toaster position="top-right" reverseOrder={false} />


      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user-area"
              element={
                <ProtectedRoute>
                  <UserArea />
                </ProtectedRoute>
              }
            />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>

  );
}

export default App;
