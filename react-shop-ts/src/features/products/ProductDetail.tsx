import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AddToCartButton } from './AddToCartButton';
import { useEffect } from 'react';
import { fetchProductById } from './productsSlice';
import styles from './ProductDetail.module.css';
import { ProductReviews } from '../reviews/ProductReviews';
import { ProductRating } from './ProductRating';

export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { selectedProduct, status } = useAppSelector(state => state.products);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [id, dispatch]);

    if (status === 'loading') {
        return <div className="text-center py-8">Загружаем информацию о товаре...</div>;
    }

    if (!selectedProduct) {
        return <div className="text-center py-8">Товар не найден</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.imageColumn}>
                    <div className={styles.imageContainer}>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            className={styles.image}
                        />
                    </div>
                </div>

                <div className={styles.infoColumn}>
                    <div className={styles.productInfo}>
                        <h1 className={styles.title}>{selectedProduct.title}</h1>
                        <p className={styles.category}>{selectedProduct.category}</p>
                        <p className={styles.price}>${selectedProduct.price.toFixed(2)}</p>
                        {selectedProduct.rating && <ProductRating rating={selectedProduct.rating} />}
                        <p className={styles.description}>{selectedProduct.description}</p>
                        <AddToCartButton product={selectedProduct} />
                    </div>

                    <div className={styles.reviewsContainer}>
                        <ProductReviews productId={selectedProduct.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};