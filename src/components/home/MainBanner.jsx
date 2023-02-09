import styles from "../../styles/home/MainBanner.module.css";
import HomeCarousal from "./HomeCarousal";

const MainBanner = () => {
  return (
    <div className={styles.mainbanner}>
      <div className={styles.top}>
        <div className={styles.carousal}>
          <HomeCarousal />
        </div>
        <div className={styles.banner}>
          <img src="https://onemg.gumlet.io/a_ignore,w_480,h_200,c_fit,q_auto,f_auto/85bbe9a7-230b-4836-bff3-d5f451b426a7.png" />
        </div>
      </div>
      <div className={styles.bottom}>
        <p>Tata 1mg: India’s Leading Online Pharmacy & Healthcare Platform</p>
      </div>
    </div>
  );
};

export default MainBanner;
