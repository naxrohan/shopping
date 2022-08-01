
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom"
import {useSelector} from "react-redux"

const App = () => {
  const user = useSelector( state => state.user.currentUser);
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* : add redirection logic for anon users */}
        <Route path="/login" element={user !== null ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user !== null ? <Navigate to="/" /> : <Register />} />

        <Route path="/logout" element={user ? <Login /> : <Navigate to="/" /> } />

        {/* 404 route
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;