import styles from "../../styles/footer/HeadingList.module.css";

const HeadingList = ({ heading, list }) => {
  return (
    <div className={styles.container}>
      <div>
        <h4>{heading}</h4>
      </div>
      <div className={styles.list}>
        {list.map((e) => (
          <p key={e}>{e}</p>
        ))}
      </div>
    </div>
  );
};

export default HeadingList;
