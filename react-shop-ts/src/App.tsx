import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { CartPage } from './features/cart/CartPage';
import { Link } from 'react-router-dom';
import { ProductsList } from './features/products/ProductsList';
import styles from './App.module.css';
import {ProductDetail} from "./features/products/ProductDetail.tsx";
import { CartIcon } from './components/CartIcon.tsx';
import { CheckoutPage } from './features/checkout/CheckoutPage.tsx';
import { LoginPage } from './features/auth/LoginPage.tsx';
import { RegisterPage } from './features/auth/RegisterPage.tsx';
import { AuthButtons } from './features/auth/AuthButtons.tsx';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <div className={styles.navContent}>
            <Link to="/" className={styles.navLink}>Товары</Link>
            <Link to="/cart" className={`${styles.navLink} ${styles.cartLink}`}>
            <CartIcon/>
            <span>Корзина</span>
            </Link>
            <AuthButtons />
          </div>
        </nav>
        
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<ProductsList/>} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
export default App
