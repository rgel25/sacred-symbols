import Header from "./components/header/Header.component";
import "./App.styles.scss";
import HomeScreen from "./screens/home/HomeScreen.component";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./screens/404/PageNotFound.component";
import ProductScreen from "./screens/product/ProductScreen.component";
import CartScreen from "./screens/cart/CartScreen.component";
import LoginScreen from "./screens/login/LoginScreen.component";
import RegisterScreen from "./screens/register/RegisterScreen.component";
import ProfileScreen from "./screens/profile/ProfileScreen.component";
import ShippingScreen from "./screens/shipping/ShippingScreen.component";
import PaymentScreen from "./screens/payment/PaymentScreen.component";
import PlaceorderScreen from "./screens/placeorder/PlaceorderScreen.component";
import OrderScreen from "./screens/order/OrderScreen.component";
import UserListScreen from "./screens/userlist/UserListScreen.component";
import UserEditScreen from "./screens/useredit/UserEditScreen.component";
import ProductListScreen from "./screens/productlist/ProductListScreen.component";
import ProductEditScreen from "./screens/productedit/ProductEditScreen.component";
import OrderListScreen from "./screens/orderlist/OrderListScreen.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<HomeScreen />} />
        <Route path="search/:keyword" element={<HomeScreen />} />
        <Route path="page/:pageNumber" element={<HomeScreen />} />
        <Route
          path="search/:keyword/page/:pageNumber"
          element={<HomeScreen />}
        />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="shipping" element={<ShippingScreen />} />
        <Route path="payment" element={<PaymentScreen />} />
        <Route path="placeorder" element={<PlaceorderScreen />} />
        <Route path="admin/users" element={<UserListScreen />} />
        <Route path="admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="admin/products" element={<ProductListScreen />} />
        <Route
          path="admin/products/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="admin/orders" element={<OrderListScreen />} />
        <Route path="order/:id" element={<OrderScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="cart/" element={<CartScreen />} />
        <Route path="cart/:id" element={<CartScreen />} />
        <Route path="*" element={<PageNotFound />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
