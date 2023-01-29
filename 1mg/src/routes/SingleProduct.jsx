import React from "react";
import { useState, useEffect } from "react";
import style from "../styles/SingleProduct.module.css";
import Youtubevideo from "../components/SingleProduct/youtubevideo";
import Product_detail_info from "../components/SingleProduct/Productdetailinfo";
import LabTest from "../components/SingleProduct/LabTest";
import ConsultDoctor from "../components/SingleProduct/ConsultDoctor";
import Additional from "../components/SingleProduct/Additional";
import Rating from "../components/Product/Rating";
import AddtoCart from "../components/SingleProduct/AddtoCart";
import DeliveryBox from "../components/SingleProduct/DeliveryBox";
import AdditionalOffer from "../components/SingleProduct/AdditionalOffer";
import ContentDetails from "../components/SingleProduct/ContentDetails";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [state, setState] = useState({});
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(state.price);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://onemg-express-server.onrender.com/medicines/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState(data);
        setPrice(data.price);
      });
  }, []);

  const handleprice = (value) => {
    setPrice(value);
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-around" }}
        className={style.parent}
      >
        <div className={style.product_info}>
          <div className={style.product_image}>
            <img src={state.image} alt="" />
          </div>
          <div className={style.product_detail}>
            <h1>{state.title}</h1>
            <p style={{ fontSize: "12px", color: "#ff6f61" }}>
              {state.brand} Pvt Ltd.
            </p>
            <div
              className={style.review_box}
              style={{ display: "flex", gap: "20px", marginTop: "10px" }}
            >
              {/* <button>{state.rating}  <FontAwesomeIcon icon={faStar} /></button> */}
              <Rating rating={state.rating} />
              <p className={style.review}>
                {Math.floor(Math.random() * 50)} ratings &{" "}
                {Math.floor(Math.random() * 10)} reviews
              </p>
            </div>
            <p style={{ fontSize: "16px", marginTop: "15px" }}>Pack Size (3)</p>
            <div className={style.qty_price_box}>
              {state.product_form === "Tablet" ||
              state.product_form === "Capsule" ||
              state.product_form === "Gummy" ? (
                <>
                  <div
                    onClick={() => handleprice(state.price)}
                    name="1"
                    className={style.tab_qty}
                  >
                    <p>30 {state.product_form}</p>
                    <br />
                    <span>Rs.{state.price}</span>
                  </div>
                  <div
                    onClick={() => handleprice(state.price * 2)}
                    name="2"
                    className={style.tab_qty}
                  >
                    <p>60 {state.product_form}</p>
                    <br />
                    <span>Rs.{state.price * 2}</span>
                  </div>
                  <div
                    onClick={() => handleprice(state.price * 3)}
                    name="3"
                    className={style.tab_qty}
                  >
                    <p>90 {state.product_form}</p>
                    <br />
                    <span>Rs.{state.price * 3}</span>
                  </div>
                </>
              ) : state.product_form === "Powder" ? (
                <>
                  <div
                    onClick={() => handleprice(state.price)}
                    className={style.tab_qty}
                  >
                    <p>200g {state.product_form}</p>
                    <br />
                    <span>Rs.{state.price}</span>
                  </div>
                  <div
                    onClick={() => handleprice(state.price * 2)}
                    className={style.tab_qty}
                  >
                    <p>500g {state.product_form}</p>
                    <br />
                    <span>Rs.{state.price * 2}</span>
                  </div>
                  <div
                    onClick={() => handleprice(state.price * 3)}
                    className={style.tab_qty}
                  >
                    <p>750g {state.product_form}</p>
                    <br />
                    <span>Rs.{state.price * 3}</span>
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </div>
            <p style={{ fontSize: "16px", marginTop: "20px" }}>
              Product Heighlights:-
            </p>
            <p>
              <ul className={style.product_highlight}>
                <li>
                  <span style={{ fontWeight: "700" }}>
                    {" "}
                    To support your overall health:
                  </span>{" "}
                  Centrum Women, a multivitamin and multimineral daily
                  supplement is formulated with 23 essential vitamins and
                  minerals to support overall health
                </li>
                <li>
                  <span style={{ fontWeight: "700" }}>
                    Formulated with plant-based botanical for radiance:
                  </span>{" "}
                  Centrum Women, multivitamin and multimineral with
                  scientifically studied ingredients and plant-based botanical
                  hyaluronate for healthy skin
                </li>
                <li>
                  <span style={{ fontWeight: "700" }}>Supports immunity:</span>{" "}
                  These multivitamins and multimineral tablets contain vitamins
                  C, D3, B12 and zinc for immunity support. It helps the immune
                  system to help fight off infections
                </li>
                <li>
                  <span style={{ fontWeight: "700" }}>Stronger bones:</span>{" "}
                  Centrum Women, a multivitamin and multimineral supplement has
                  calcium, vitamin D3 and magnesium that helps to build bones
                  and supports strong bone health. Consume 1 tablet daily
                </li>
              </ul>
            </p>
          </div>
        </div>
        <div className={style.price_info}>
          <AddtoCart state={state} price={price} />

          <DeliveryBox />
          <div style={{ marginTop: "20px" }}>
            <img src="https://onemg.gumlet.io/8aea5d70-3f52-4c65-91ce-d30622dec7fa_1670222777.jpg?w=536&amp;h=123&amp;format=auto" />
          </div>
          <AdditionalOffer />
        </div>
      </div>
      <div
        className={style.additionl_info_container}
        style={{ display: "flex" }}
      >
        <div>
          <Youtubevideo />
          <div className={style.Product_detail_info} style={{ width: "800px" }}>
            <Product_detail_info />
          </div>
        </div>
        <div style={{ width: "30%" }}>
          <LabTest />
          <ConsultDoctor />
          <Additional />
          <ContentDetails />
          <div style={{ marginTop: "20px" }}>
            <img
              src="https://onemg.gumlet.io/1e960978-1780-4fa1-98da-ad02514fd6e8_1670571886.jpg?w=506&h=633&format=auto"
              alt=""
            />
          </div>
          {/* <AdditionalOffer /> */}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
