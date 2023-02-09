import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeCartItemQuantity,
  deleteItem,
  fillCart,
} from "../redux/cart/cartActions";

import styles from "../styles/cart/Cart.module.css";

const Cart = () => {
  const products = useSelector((store) => store.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fillCart());
  }, []);

  const handleQuantityChange = async (payload) => {
    dispatch(changeCartItemQuantity(payload));
  };

  const handleDelete = async (payload) => {
    dispatch(deleteItem(payload));
  };

  const totalPrice = products.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);

  const totalDiscount = products.reduce((acc, ele) => {
    return (
      acc +
      ele.price * ele.quantity -
      Math.round((ele.price - ele.price * (ele.discount / 100)) * ele.quantity)
    );
  }, 0);

  if (products.length == 0) {
    return (
      <main className={styles["empty-main"]}>
        <div className={styles["empty-cart-container"]}>
          <h1>The cart is empty</h1>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles["cart-count"]}>
        <p>Total cart items: {products.length}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.items}>
          {products.length > 0 &&
            products.map((e) => (
              <div className={styles["single-item"]} key={e.variant + e.title}>
                <div className={styles["item-row"]}>
                  <div className={styles["item-left"]}>
                    <p>{e.title}</p>
                    <span>{e.variant}</span>
                  </div>
                  <div className={styles["item-right"]}>
                    <p>
                      ₹{" "}
                      {Math.round(
                        (e.price - e.price * (e.discount / 100)) * e.quantity
                      )}
                    </p>
                    <span>
                      MRP ₹{" "}
                      <span className={styles["cut-off"]}>
                        {e.price * e.quantity}
                      </span>
                    </span>
                  </div>
                </div>
                <div className={styles["item-actions"]}>
                  <div className={styles["action-left"]}>
                    <button
                      onClick={() =>
                        handleDelete({
                          product_id: e.product_id,
                          variant: e.variant,
                        })
                      }
                    >
                      <img
                        src="https://img.1mg.com/images/delete_icon.svg"
                        alt=""
                      />
                      <p>Remove</p>
                    </button>
                  </div>
                  <div className={styles["action-right"]}>
                    <button
                      className={`${styles["circle-btn"]}  ${styles["btn-white"]}`}
                      onClick={() =>
                        handleQuantityChange({
                          product_id: e.product_id,
                          quantity: -1,
                          currentQuantity: e.quantity,
                          variant: e.variant,
                        })
                      }
                    >
                      <p>-</p>
                    </button>
                    <p>{e.quantity}</p>
                    <button
                      className={`${styles["circle-btn"]}  ${styles["btn-red"]}`}
                      onClick={() =>
                        handleQuantityChange({
                          product_id: e.product_id,
                          quantity: 1,
                          currentQuantity: e.quantity,
                          variant: e.variant,
                        })
                      }
                    >
                      <p>+</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={styles.pricing}>
          <div className={styles["price-list"]}>
            <div className={styles["price-list-row"]}>
              <p>Item Total(MRP)</p>
              <p>₹ {totalPrice}</p>
            </div>
            <div className={styles["price-list-row"]}>
              <p>Price Discount</p>
              <p> ₹ {totalDiscount}</p>
            </div>
            <div className={styles["price-list-row"]}>
              <p>Shipping Fee</p>
              <p>As per delivery address</p>
            </div>
            <div className={styles["price-list-row"]}>
              <b>To be paid</b>
              <b>₹ {totalPrice - totalDiscount}</b>
            </div>
            <div
              className={`${styles["price-list-row"]} ${styles["green-background"]}`}
            >
              <p>Total Savings</p>
              <p>₹ {totalDiscount}</p>
            </div>
          </div>
          <div className={styles["location-container"]}>
            <div className={styles["location-top"]}>
              <p>Your delivery location</p>
              <b>Pune</b>
            </div>
            <div className={styles["location-bottom"]}>
              <button onClick={() => navigate("/address")}>CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
