import React from "react";
import style from "../styles/payment/Payment.module.css";
import OTP_box from "../components/payment/OTP_box";
import { useState } from "react";

export default function Payment() {
  const [state, setstate] = useState(false);

  const payment_check = (e) => {
    e.preventDefault();
    setstate(true);
  };

  return (
    <main className={style.main}>
      <div className={style.App}>
        <div>
          <h1>Add Credit Card</h1>
          <p>
            It may take a few moments for transection to appear, <br /> do not
            close the window{" "}
          </p>
        </div>

        <hr />
        <form action="" className={style.form} onSubmit={payment_check}>
          <label htmlFor="">Card Number</label>
          <input type="number" placeholder="**** **** **98" required />
          <label htmlFor="">Card holder</label>
          <input type="text" placeholder="Cardholder Name" required />
          <div className={style.details}>
            <div>
              <label htmlFor="">Expiration Date</label>
              <div>
                <input type="number" placeholder="12" required />
                <input type="number" placeholder="2025" required />
              </div>
            </div>
            <div>
              <label htmlFor="">CVV</label>
              <input type="number" placeholder="***" />
            </div>
          </div>
          <input type="submit" className={style.submit_btn} value="Add Card" />
        </form>
      </div>
      <OTP_box state={state} />
    </main>
  );
}
