import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Footer from "./components/Footer";
import Legal from "./pages/Legal";
import EditProductPage from "./pages/EditProductPage";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/legal" element={<Legal />}></Route>
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          {user && (
            <>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/new-product" element={<NewProduct />}></Route>
              <Route path="/orders" element={<OrdersPage />}></Route>
            </>
          )}

          {user && user.isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard />}></Route>
              <Route
                path="/product/:id/edit"
                element={<EditProductPage />}
              ></Route>
            </>
          )}

          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/category/:category" element={<CategoryPage />} />

          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
