import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AddToCartButton } from "./AddToCartButton";
import { fetchProducts } from "./productsSlice";
import styles from "./ProductsList.module.css";
import { Link } from "react-router-dom";
import { CategoryFilter } from "../../components/CategoryFilter";
import { ProductRating } from "./ProductRating";
import { SearchBar } from "./SearchBar";

export const ProductsList = () => {
  const dispatch = useAppDispatch();
  const {
    items: products,
    status,
    selectedCategory,
    searchTerm,
  } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Загружаем товары...</div>;
  }

  if (status === "failed") {
    return <div>Ошибка загрузки товаров</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-8">Товары не найдены</div>;
  }

  const filteredProducts = products
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) =>
      searchTerm
        ? product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        : true
    );

  return (
    <>
      <div className={styles.filtersContainer}>
        <CategoryFilter />
        <SearchBar />
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.noResults}>
          <h3>Товары не найдены</h3>
          <p>
            Попробуйте изменить поисковый запрос или выбрать другую категорию
          </p>
        </div>
      ) : (
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
              />
              <Link
                to={`/products/${product.id}`}
                className="font-semibold mt-2 hover:text-blue-500"
              >
                {product.title}
              </Link>
              <p className={styles.productPrice}>${product.price}</p>
              {product.rating && (
                <ProductRating rating={product.rating} showCount={false} />
              )}
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
