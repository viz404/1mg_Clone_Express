import styles from "../../styles/navbar/SubNavThree.module.css";

import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const SubNavThree = () => {
  return (
    <div className={styles.subnavthree}>
      <div className={styles.container}>
        <div className={styles.item}>
          <Link to="/products/vitamins">
            <p>Vitamins & Nutrition</p>
            <RiArrowDropDownLine />
          </Link>
        </div>
        <div className={styles.item}>
          <Link to="/products/diabetes">
            <p>Diabetes</p>
            <RiArrowDropDownLine />
          </Link>
        </div>
        <div className={styles.item}>
          <Link to="/products/healthcare">
            <p>Healthcare Devices</p>
            <RiArrowDropDownLine />
          </Link>
        </div>
        <div className={styles.item}>
          <Link to="/products/personal">
            <p>Personal Care</p>
            <RiArrowDropDownLine />
          </Link>
        </div>
        <div className={styles.item}>
          <Link to="/products/ayurveda">
            <p>Ayurveda Products</p>
            <RiArrowDropDownLine />
          </Link>
        </div>
        <div className={styles.item}>
          <Link to="/products/homeopathy">
            <p>Homeopathy</p>
            <RiArrowDropDownLine />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubNavThree;
