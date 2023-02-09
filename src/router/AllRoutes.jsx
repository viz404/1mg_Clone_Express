import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SearchProducts from "../pages/SearchProducts";
import ProductCategory from "../pages/ProductCategory";
import SingleProductPage from "../pages/SingleProductPage";
import Cart from "../pages/Cart";
import ProtectedRoute from "../pages/ProtectedRoute";
import Address from "../pages/Address";
import Payment from "../pages/Payment";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<SearchProducts />} />
      <Route path="/products/:category" element={<ProductCategory />} />
      <Route path="/singleproduct/:id" element={<SingleProductPage />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/address"
        element={
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
