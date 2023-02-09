import { useSelector } from "react-redux";
import styles from "../../styles/product/ProductContainer.module.css";

import SingleProduct from "./SingleProduct";

const dummyArray = [1, 2, 3, 4];

const ProductContainer = () => {
  const { products, isLoading, isError } = useSelector(
    (store) => store.products
  );

  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {isLoading ? (
          <>
            {dummyArray.map((e, index) => (
              <div className={styles["loading-product"]} key={index}>
                <div className={styles["loading-image"]}>
                  <button> </button>
                </div>
                <div className={styles["loading-title"]}>
                  <button> </button>
                </div>
                <div className={styles["loading-title"]}>
                  <button> </button>
                </div>
                <div className={styles["loading-small-title"]}>
                  <button> </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {products.map((element) => (
              <SingleProduct
                key={element.id}
                id={element.id}
                image={element.image}
                title={element.title}
                desc={element.desc}
                rating={element.rating}
                price={element.price}
                discount={element.discount}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductContainer;
