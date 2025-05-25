import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/MainLayout";
import NoNavbarLayout from "./components/NoNavbarLayout";
import { useAuthStore } from "./store/authStore";
import RedirectAuthenticatedUsers from "./providers/RedirectAuthenticatedUsers";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import UserDashboard from "./pages/UserDashboard";
import RedirectUnauthenticatedUsers from "./providers/RedirectUnauthenticatedUsers";
import BookDetails from "./pages/BookDetails";
import { Toaster } from "react-hot-toast";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserOrders from "./pages/UserOrders";
import OrderDetails from "./pages/OrderDetails";

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
            <NoNavbarLayout>
              <SearchPage />
            </NoNavbarLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <CheckoutPage />
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
          path="/user-profile/orders"
          element={
            <MainLayout>
              <RedirectUnauthenticatedUsers>
                <UserOrders />
              </RedirectUnauthenticatedUsers>
            </MainLayout>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <MainLayout>
              <RedirectUnauthenticatedUsers>
                <OrderDetails />
              </RedirectUnauthenticatedUsers>
            </MainLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <NoNavbarLayout>
              <RedirectAuthenticatedUsers>
                <SignupPage />
              </RedirectAuthenticatedUsers>
            </NoNavbarLayout>
          }
        />
        <Route
          path="/login"
          element={
            <NoNavbarLayout>
              <RedirectAuthenticatedUsers>
                <LoginPage />
              </RedirectAuthenticatedUsers>
            </NoNavbarLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
