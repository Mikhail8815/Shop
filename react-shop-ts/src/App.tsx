import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { CartPage } from './features/cart/CartPage';
import { Link } from 'react-router-dom';
import { ProductsList } from './features/products/ProductsList';
import styles from './App.module.css';
import {ProductDetail} from "./features/products/ProductDetail.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <div className={styles.navContent}>
            <Link to="/" className={styles.navLink}>Товары</Link>
            <Link to="/cart" className={styles.navLink}>Корзина</Link>
          </div>
        </nav>
        
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<ProductsList/>} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
export default App
