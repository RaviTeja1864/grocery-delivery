import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { CheckoutFailure } from './pages/CheckoutFailure';
import { Explore } from './pages/Explore';
import { CategoryListing } from './pages/CategoryListing';
import { Search } from './pages/Search';
import { Favorites } from './pages/Favorites';
import { Account } from './pages/Account';
import { Splash } from './pages/Splash';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { SignIn } from './pages/SignIn';
import { Phone } from './pages/Phone';
import { Verification } from './pages/Verification';
import { Location } from './pages/Location';
import { SignUp } from './pages/SignUp';
import { api } from './services/api';
import { useCartStore } from './store/cartStore';
import { useSessionStore } from './store/sessionStore';
import './App.css';

const EntryGate = () => useSessionStore((state) => state.entryComplete)
  ? <Home />
  : <Navigate to="/splash" replace />;

function App() {
  const syncCart = useCartStore(state => state.syncCart);

  useEffect(() => {
    // On app start, fetch fresh products and silently validate/sync the persisted cart
    api.getProducts().then(freshProducts => {
      syncCart(freshProducts);
    });
  }, [syncCart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/phone" element={<Phone />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/location" element={<Location />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<EntryGate />} />
          <Route path="explore" element={<Explore />} />
          <Route path="category/:category" element={<CategoryListing />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="account" element={<Account />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
          <Route path="checkout/failure" element={<CheckoutFailure />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
