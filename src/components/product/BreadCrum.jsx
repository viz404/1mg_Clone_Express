import { Link } from "react-router-dom";
import styles from "../../styles/product/BreadCrum.module.css";

const BreadCrum = ({ children }) => {
  return (
    <div className={styles.breadcrum}>
      <Link to="/">Home{"  >  "}</Link>
      <Link to="#">OTC Categories{"  >  "}</Link>
      {children}
    </div>
  );
};

export default BreadCrum;
