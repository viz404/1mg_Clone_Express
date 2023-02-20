import { useSearchParams, Link } from "react-router-dom";
import styles from "../../styles/product/ProductWrapper.module.css";

import BreadCrum from "./BreadCrum";
import Banner from "./Banner";
import ProductContainer from "./ProductContainer";

const ProductWrapper = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const handleSearchParam = (e) => {
    const value = e.target.value;

    setSearchParams({ ...params, sort: value });
  };

  return (
    <div className={styles.wrapper}>
      <BreadCrum>
        <Link to="#">{category}</Link>
      </BreadCrum>
      <div className={styles.header}>
        <h1>{category.toUpperCase()}</h1>
      </div>
      <div className={styles.banner}>
        <Banner />
      </div>
      <div className={styles.filterContainer}></div>
      <div className={styles.action}>
        <p>All Products</p>
        <div className={styles.sort}>
          <p>Sort By</p>
          <select onChange={handleSearchParam} value={params.sort}>
            <option value="id">Relevance</option>
            <option value="rating">Average Customer Rating</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>
      <div className={styles.productContainer}>
        <ProductContainer />
      </div>
    </div>
  );
};

export default ProductWrapper;
