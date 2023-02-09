import styles from "../../styles/home/SmallCarousal.module.css";

const SmallCarousal = ({ data }) => {
  return (
    <div className={styles.smallcarousal}>
      <div className={styles.container}>
        {data.map((element, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.image}>
              <img src={element.image} />
            </div>
            <div className={styles.title}>
              <p>{element.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.button}>
        <button>
          <img src="https://www.1mg.com/images/next-round.svg" />
        </button>
      </div>
    </div>
  );
};

export default SmallCarousal;
