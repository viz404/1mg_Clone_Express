import { useSearchParams } from "react-router-dom";

import styles from "../styles/product/ProductPage.module.css";

import ProductWrapper from "../components/product/ProductWrapper";
import FilterAge from "../components/product/FilterAge";
import FilterGender from "../components/product/FilterGender";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchData, setFilters } from "../redux/product/productActions";

const SearchProducts = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const category = params.search || "";

  useEffect(() => {
    dispatch(setFilters({ search: category }));
  }, []);

  useEffect(() => {
    (async () => {
      dispatch(fetchSearchData(category, params));
    })();
  }, [searchParams]);

  return (
    <main className={styles.main}>
      <section className={styles.product}>
        <div className={styles.filterWrapper}>
          <div className={styles.allFilters}>
            <div className={styles.header}>
              <p>FILTERS</p>
            </div>
            <div className={styles.age}>
              <div className={styles.header}>
                <p>AGE</p>
              </div>
              <FilterAge />
            </div>
            <div className={styles.gender}>
              <div className={styles.header}>
                <p>GENDER</p>
              </div>
              <FilterGender />
            </div>
          </div>
        </div>
        <div className={styles.productWrapper}>
          <ProductWrapper category={category} />
        </div>
      </section>
    </main>
  );
};
export default SearchProducts;
