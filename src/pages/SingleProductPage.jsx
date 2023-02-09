import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductRating from "../components/product/ProductRating";
import { getSingleProduct } from "../configs/apiCalls";
import Banner from "../components/product/Banner";
import BreadCrum from "../components/product/BreadCrum";
import {
  addToCartAction,
  fillCart,
  setCartSuccess,
} from "../redux/cart/cartActions";
import Alert from "../components/common/Alert";

import styles from "../styles/singleProduct/SingleProductPage.module.css";

const number_of_ratings = 100 + Math.floor(Math.random() * 100);
const number_of_reviews = Math.floor(Math.random() * 100);

const SingleProductPage = () => {
  const { id } = useParams();
  const [loginReminder, setLoginReminder] = useState(false);
  const [cartUpdate, setCartUpdate] = useState(false);
  const [product, setProduct] = useState({});
  const [selectedVariant, setVariant] = useState({
    product_id: 0,
    title: "",
    price: 0,
    discount: 0,
    quantity: 1,
    variant: "",
  });

  const { isLoggedIn } = useSelector((store) => store.user);
  const { isLoading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fillCart());
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchData = async (id) => {
      const { status, data } = await getSingleProduct(id);
      if (status) {
        setProduct(data);
      }
    };
    fetchData(id);
  }, []);

  useEffect(() => {
    setVariant({
      ...selectedVariant,
      title: product.title,
      discount: product.discount,
      price: product.price,
      variant: product.desc,
      product_id: product.id,
    });
  }, [product]);

  const handleSubmit = async () => {
    if (isLoggedIn == false) {
      setLoginReminder(true);
    } else {
      dispatch(addToCartAction(selectedVariant));
      setCartUpdate(true);
    }
  };

  return (
    <main className={styles.main}>
      <Alert
        showPopUp={cartUpdate}
        message="cart updated"
        onButtonClick={() => setCartUpdate(false)}
      />
      {isLoggedIn && <Alert showPopUp={isLoading} message="fetching cart" />}
      <Alert
        showPopUp={loginReminder}
        message="Please login to access your cart"
        onButtonClick={() => setLoginReminder(false)}
      />
      <div className={styles["bread-crum-container"]}>
        <BreadCrum>
          <Link to={"/products/" + product.category}>
            {product.category + " > "}
          </Link>
          <Link to="#">{product.title}</Link>
        </BreadCrum>
      </div>
      <div className={styles["top-section"]}>
        <div className={styles["image-container"]}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles["product-selector"]}>
          <h2>{product.title}</h2>
          <div className={styles["rating-container"]}>
            <ProductRating rating={product.rating} />
            <p>
              {number_of_ratings} Ratings and {number_of_reviews} Reviews
            </p>
          </div>
          <p>Variant {"(" + product.variants?.length + ")"}</p>
          <div className={styles["variants-container"]}>
            {product.variants?.length > 0 &&
              product.variants.map((e) => (
                <div
                  key={e.size}
                  className={`${styles.variant} ${
                    Math.round(e.price - e.price * (product.discount / 100)) ==
                    Math.round(
                      selectedVariant?.price -
                        selectedVariant?.price *
                          (selectedVariant?.discount / 100)
                    )
                      ? styles["variant-selected"]
                      : ""
                  }`}
                  onClick={() => {
                    setVariant({
                      ...selectedVariant,
                      price: e.price,
                      variant: e.size,
                    });
                  }}
                >
                  <p>{e.size}</p>
                  <p>
                    ₹ {Math.round(e.price - e.price * (product.discount / 100))}
                  </p>
                </div>
              ))}
          </div>
          <div className={styles.highlights}>
            <p>Product highlights</p>
            <ul>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
          </div>
        </div>
        <div className={styles["cart-container"]}>
          <div className={styles["card-one"]}>
            <div className={styles.topgreen}>
              <span>
                <img
                  src="https://www.1mg.com/images/social_cue.svg"
                  alt="social-cue"
                  className={styles.svg}
                />
              </span>
              <p>{number_of_ratings + 200} people bought this recently</p>
            </div>
            <div className={styles["card-content"]}>
              <div className={styles.radio}>
                <input type="radio" name="price" id="priceone" defaultChecked />
                <label htmlFor="priceone" className={styles.label}>
                  <span className={styles.fontBig}>
                    ₹
                    {Math.round(
                      selectedVariant?.price -
                        selectedVariant?.price *
                          (selectedVariant?.discount / 100)
                    )}
                  </span>{" "}
                  <span className={styles.cutoff}>
                    ₹{selectedVariant?.price}{" "}
                  </span>
                  <span className={styles.green}>{product.discount}% off</span>{" "}
                </label>
              </div>
              <div className={styles.radio}>
                <input type="radio" name="price" id="pricetwo" />
                <label htmlFor="pricetwo">
                  <span className={styles.fontBig}>
                    ₹
                    {Math.round(
                      selectedVariant?.price -
                        selectedVariant?.price *
                          (selectedVariant?.discount / 100)
                    )}
                  </span>{" "}
                  + free shipping and 3% Extra NeuCoins with care plan
                </label>
              </div>
              <p className={styles.short}>Inclusive of all taxes</p>
              <div className={styles.select}>
                <select
                  name="pack"
                  id="pack"
                  onChange={(e) => {
                    setVariant({
                      ...selectedVariant,
                      quantity: Number(e.target.value),
                    });
                  }}
                >
                  <option value="1">1 pack</option>
                  <option value="2">2 pack</option>
                  <option value="3">3 pack</option>
                  <option value="4">4 pack</option>
                  <option value="5">5 pack</option>
                </select>
                <p>{selectedVariant?.variant}</p>
              </div>
              <button className={styles["cart-btn"]} onClick={handleSubmit}>
                ADD TO CART
              </button>
            </div>
          </div>
          <div className={styles["delivery-container"]}>
            <p>
              <b>Earliest delivery by</b>{" "}
              <span className={styles.greenBold}>10pm, Tomorrow</span>
            </p>
            <p>Delivering to: 411058, Pune</p>
          </div>
          <Banner />
        </div>
      </div>
      {/* {loginReminder && (
        <div className={styles["login-popup"]}>
          <div className={styles["login-container"]}>
            <p>Please login to access your cart</p>
            <button onClick={() => setLoginReminder(false)}>
              <p>X</p>
            </button>
          </div>
        </div>
      )} */}
    </main>
  );
};

export default SingleProductPage;
