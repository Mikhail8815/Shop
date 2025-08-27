import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { setSearchTerm } from "./productsSlice";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = (value: string) => {
    setInputValue(value);
    dispatch(setSearchTerm(value));
  };

  const clearSearch = () => {
    setInputValue("");
    dispatch(setSearchTerm(""));
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={inputValue}
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.searchInput}
        />
        {inputValue && (
          <button
            onClick={clearSearch}
            className={styles.clearButton}
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
