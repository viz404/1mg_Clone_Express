import React from "react";
import { useState } from "react";
import style from "../../styles/payment/OTP_box.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../redux/cart/cartActions";
import Alert from "../common/Alert";

const OTP_box = ({ state }) => {
  const [popup, setPopup] = useState({
    status: false,
    message: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState();
  const handlechange = (e) => {
    setOtp(e.target.value);
  };

  const handleotp = (e) => {
    e.preventDefault();
    if (otp == "1234") {
      dispatch(emptyCart());
      navigate("/");
    } else {
      setPopup({
        status: true,
        message: "Please enter valid OTP",
      });
    }
  };

  const disablePopup = () => {
    setPopup({
      status: false,
      message: "",
    });
  };
  return (
    <div
      className={style.OTP_container}
      style={{ display: state ? "block" : "none" }}
    >
      <Alert
        showPopUp={popup.status}
        message={popup.message}
        onButtonClick={disablePopup}
      />
      <div className={style.OTP_div}>
        <form action="" className={style.OTP_form} onSubmit={handleotp}>
          <label htmlFor="">Enter OTP</label>
          <input
            type="number"
            placeholder="Enter OTP"
            onChange={handlechange}
          />
          <input type="submit" value="submit" className={style.OTP_btn} />
        </form>
      </div>
    </div>
  );
};

export default OTP_box;
