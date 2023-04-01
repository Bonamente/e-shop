import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CatalogPage from './pages/catalog/CatalogPage';
import ProductPage from './pages/product/ProductPage';
import CartPage from './pages/cart/CartPage';
import AdminPage from './pages/admin/AdminPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import Modal from './components/modal/Modal';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Modal />
    </>
  );
};

export default App;
