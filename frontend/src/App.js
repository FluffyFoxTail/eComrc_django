import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePages from "./pages/HomePages";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import DeliveryPage from "./pages/DeliveryPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import UserOrderPage from "./pages/UserOrderPage";

function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" exact element={<HomePages />} />
            <Route path={"login"} element={<LoginPage />} />
            <Route path={"register"} element={<RegisterPage />} />
            <Route path={"profile"} element={<ProfilePage />} />
            <Route path={"myorders/:id"} element={<UserOrderPage />} />
            <Route path={"delivery"} element={<DeliveryPage />} />
            <Route path={"payment"} element={<PaymentPage />} />
            <Route path={"placeorder"} element={<PlaceOrderPage />} />
            <Route path={"product/:id"} element={<ProductPage />} />
            <Route path={"order"} element={<OrderPage />}>
              <Route path=":id" element={<OrderPage />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
