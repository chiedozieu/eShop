import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  
} from "./routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { store } from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import Footer from "./components/layout/Footer.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute.js";
import {ShopHomePage} from "./ShopRoutes.js";
import SellerProtectedRoute from "./protectedRoutes/SellerProtectedRoute.js";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());

  }, []);

   

  return (
    <>
      {loading || isLoading ? null : (
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route
              path="/seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Shop routes */}
            <Route path="/shop-create" element={<ShopCreatePage/>} />
            <Route path="/shop-login" element={<ShopLoginPage/>} />
            <Route path="/shop/:id" element={
              <SellerProtectedRoute isSeller={isSeller}>
                <ShopHomePage/>
              </SellerProtectedRoute>
            } />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
