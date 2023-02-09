import styles from "../../styles/common/Alert.module.css";

const Alert = ({ message, onButtonClick, showPopUp }) => {
  return (
    <>
      {showPopUp && (
        <div className={styles["alert-popup"]}>
          <div className={styles["alert-container"]}>
            <p>{message}</p>
            {onButtonClick && (
              <button onClick={onButtonClick}>
                <p>X</p>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
