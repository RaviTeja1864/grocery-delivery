import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { api } from './services/api';
import { useCartStore } from './store/cartStore';
import './App.css';

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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
