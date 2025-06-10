import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AddToCartButton } from './AddToCartButton';
import { fetchProducts } from './productsSlice';
import styles from './ProductsList.module.css';
import {Link} from "react-router-dom";
import { CategoryFilter } from '../../components/CategoryFilter';

export const ProductsList = () => {

   const dispatch = useAppDispatch();
  const { items: products, status, selectedCategory } = useAppSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Загружаем товары...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка загрузки товаров</div>;
  }

   if (products.length === 0) {
    return <div className="text-center py-8">Товары не найдены</div>;
  }

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  return (
    <>
    <CategoryFilter />
    <div className={styles.productsGrid}>
      {filteredProducts.map(product => (
        <div key={product.id} className={styles.productCard}>
          <img 
            src={product.image} 
            alt={product.title} 
            className={styles.productImage}
          />
          <Link to={`/products/${product.id}`} className="font-semibold mt-2 hover:text-blue-500">
            {product.title}
          </Link>
          <p className={styles.productPrice}>${product.price}</p>
          <AddToCartButton product={product} />
        </div>
      ))}
    </div>
    </>
  );
};