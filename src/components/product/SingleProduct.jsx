import styles from "../../styles/product/SingleProduct.module.css";
import { useNavigate } from "react-router-dom";

import ProductRating from "./ProductRating";

const SingleProduct = (props) => {
  const { id, image, title, desc, rating, price, discount } = props;
  const final_price = Math.round(price - price * (discount / 100));
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/singleproduct/${id}`);
  };
  return (
    <div onClick={redirect} className={styles.product}>
      <div className={styles.image}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.desc}>
        <p>{desc}</p>
      </div>
      <div className={styles.rating}>
        <ProductRating rating={rating} />
      </div>
      <div className={styles.discount}>
        <p>MRP</p>
        <span>₹{price}</span>
        <p>{discount}% OFF</p>
      </div>
      <div className={styles.mrp}>
        <p>
          <span>MRP</span> ₹{final_price}
        </p>
        <button>ADD</button>
      </div>
    </div>
  );
};

export default SingleProduct;
