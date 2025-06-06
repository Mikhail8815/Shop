
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AddToCartButton } from './AddToCartButton';
import { fetchProducts } from './productsSlice';
import styles from './ProductsList.module.css';

export const ProductsList = () => {
  // Получаем товары из Redux store
   const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading products...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading products</div>;
  }

   if (products.length === 0) {
    return <div className="text-center py-8">No products available</div>;
  }

  return (
    <div className={styles.productsGrid}>
      {products.map(product => (
        <div key={product.id} className={styles.productCard}>
          <img 
            src={product.image} 
            alt={product.title} 
            className={styles.productImage}
          />
          <h3 className={styles.productTitle}>{product.title}</h3>
          <p className={styles.productPrice}>${product.price}</p>
          <AddToCartButton product={product} />
        </div>
      ))}
    </div>
  );
};