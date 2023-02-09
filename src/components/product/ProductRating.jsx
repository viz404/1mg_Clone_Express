import styles from "../../styles/product/ProductRating.module.css";

const ProductRating = ({ rating }) => {
  return (
    <div className={styles.rating}>
      <p>{rating}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="15"
        viewBox="0 0 51 48"
      >
        <path
          fill="#ffffff"
          stroke="none"
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        ></path>
      </svg>
    </div>
  );
};

export default ProductRating;
