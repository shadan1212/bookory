import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import { useAuthStore } from "./store/authStore";
import RedirectAuthenticatedUsers from "./providers/RedirectAuthenticatedUsers";
import AdminDashboard from "./pages/AdminDashboard";
import Browse from "./pages/Browse";
import Cart from "./pages/Cart";
import UserDashboard from "./pages/UserDashboard";
import RedirectUnauthenticatedUsers from "./providers/RedirectUnauthenticatedUsers";
import BookDetails from "./pages/BookDetails";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Homepage />
            </MainLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <MainLayout>
              <RedirectUnauthenticatedUsers>
                <AdminDashboard />
              </RedirectUnauthenticatedUsers>
            </MainLayout>
          }
        />
        <Route
          path="/book/:id"
          element={
            <MainLayout>
              <BookDetails />
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <Browse />
            </MainLayout>
          }
        />
        <Route
          path="cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <MainLayout>
              <RedirectUnauthenticatedUsers>
                <UserDashboard />
              </RedirectUnauthenticatedUsers>
            </MainLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <RedirectAuthenticatedUsers>
                <SignupPage />
              </RedirectAuthenticatedUsers>
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <RedirectAuthenticatedUsers>
                <LoginPage />
              </RedirectAuthenticatedUsers>
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
