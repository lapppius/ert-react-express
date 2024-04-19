import Radios from "./pages/Radios";
import { Radio } from "./pages/Radio";

import Epg from "./pages/Epg";
import NotFound from "./pages/NotFound";
import AdminRadios from "./pages/Admin/AdminRadios";
import AdminLayout from "./Layouts/AdminLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./pages/PrivateRoute";
import { Layout } from "./Layouts/Layout";
import UserLayout from "./Layouts/UserLayout";
import { Route, Routes } from "react-router-dom";
import { StrictMode } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { PlayerProvider } from "./contexts/PlayerContext";
import { Navigate } from "react-router-dom";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminImages from "./pages/Admin/AdminImages";

export default function App() {
  return (
    <StrictMode>
      <PlayerProvider>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<UserLayout />}>
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route
                  path="/Profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                ></Route>

                <Route path="/" element={<Radios />} />
                <Route path="/radios" element={<Radios />} />

                <Route path=":slug" element={<Radio />} />
                <Route path="/epg" element={<Epg />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="radios" replace />} />
                <Route
                  index
                  path="radios"
                  element={
                    <PrivateRoute>
                      <AdminRadios />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <PrivateRoute>
                      <AdminUsers />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="images"
                  element={
                    <PrivateRoute>
                      <AdminImages />
                    </PrivateRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </PlayerProvider>
    </StrictMode>
  );
}
