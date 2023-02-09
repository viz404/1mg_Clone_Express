import styles from "../../styles/footer/Footer.module.css";
import HeadingList from "./HeadingList";

const listA = [
  "About Us",
  "Contact Us",
  "Press Coverage",
  "Careers",
  "Business Partnership",
  "Become a Health Partner",
  "Corporate Governance",
];

const listB = [
  " Privacy Policy",
  "Terms and Conditions",
  "Editorial Policy",
  "Return Policy",
  "IP Policy",
  "Grievance Redressal Policy",
  "Fake Jobs and Fraud Disclaimer",
];

const listC = [
  "  Order Medicines",
  "Book Lab Tests",
  "Consult a Doctor",
  "Ayurveda Articles",
  "Hindi Articles",
  "Care Plan",
];

const socialImages = [
  "https://onemg.gumlet.io/vqpr5zx9ofpsyafjwwin.svg",
  "https://onemg.gumlet.io/wwynoy59i3iakt8te5xl.svg",
  "https://onemg.gumlet.io/cwrpdmlzckwzvv9e1gjv.svg",
  "https://onemg.gumlet.io/tywtfwyzxb8ujnqmbuau.svg",
];

const Footer = () => {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["section-one"]}>
        <HeadingList heading="Know Us" list={listA} />
        <HeadingList heading="Our Policies" list={listB} />
        <HeadingList heading="Our Services" list={listC} />
        <div className={styles["section-one-item"]}>
          <h3>Connect</h3>
          <div className={styles["section-one-item-elements"]}>
            <p>Social Links</p>
            <div className={styles["section-one-image-container"]}>
              {socialImages.map((e) => (
                <img src={e} key={e} />
              ))}
            </div>
            <p>Want daily dose of health?</p>
            <button>SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
