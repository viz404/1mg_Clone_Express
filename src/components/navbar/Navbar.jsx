import styles from "../../styles/navbar/Navbar.module.css";

import SubNavOne from "./SubNavOne";
import SubNavThree from "./SubNavThree";
import SubNavTwo from "./SubNavTwo";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <SubNavOne />
      <SubNavTwo />
      <SubNavThree />
    </div>
  );
};

export default Navbar;
