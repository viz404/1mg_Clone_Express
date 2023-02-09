import styles from "../styles/address/Address.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [address, setAddress] = useState({
    address: "",
    landmark: "",
    pincode: "",
    locality: "",
    city: "",
    state: "",
    customer_name: "",
    contact_number: "",
    position: "",
  });

  const navigate = useNavigate();

  const fillData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    address[name] = value;
    setAddress({ ...address });
  };

  const handleSubmit = () => {
    navigate("/payment");
  };

  return (
    <div className={styles.address}>
      <main>
        <div>
          <div className={styles.container}>
            <div className={styles.caption}>
              <p>Add New Address</p>
            </div>
            <form method="post" onSubmit={(e) => e.preventDefault()}>
              <div className={styles.address_container}>
                <div className={styles.address_item}>
                  <textarea
                    placeholder="Flat Number, Building Name, Street/Locality"
                    name="address"
                    onChange={fillData}
                    required
                  ></textarea>
                </div>
                <div className={styles.address_item}>
                  <input
                    type="text"
                    placeholder="Landmark (optional)"
                    name="landmark"
                    onChange={fillData}
                  />
                </div>
                <div className={styles.address_item}>
                  <input
                    type="number"
                    placeholder="Pincode"
                    name="pincode"
                    onChange={fillData}
                    required
                  />
                </div>
                <div className={styles.address_item}>
                  <input
                    type="text"
                    placeholder="Locality"
                    name="locality"
                    onChange={fillData}
                    required
                  />
                </div>
                <div className={styles.address_item}>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={fillData}
                    required
                  />
                </div>
                <div className={styles.address_item}>
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={fillData}
                    required
                  />
                </div>
                <div className={styles.address_item}>
                  <input
                    type="text"
                    placeholder="Customer Name"
                    name="customer_name"
                    onChange={fillData}
                    required
                  />
                </div>
                <div className={styles.address_item}>
                  <input
                    type="number"
                    placeholder="10 Digit Mobile Number"
                    name="contact_number"
                    onChange={fillData}
                    required
                  />
                </div>
                <div className={`${styles.address_item} ${styles.options}`}>
                  <div className={styles.element}>
                    <input
                      type="radio"
                      id="home"
                      name="position"
                      onChange={fillData}
                      defaultChecked
                    />
                    <label htmlFor="home">HOME</label>
                  </div>
                  <div className={styles.element}>
                    <input
                      type="radio"
                      id="office"
                      name="position"
                      onChange={fillData}
                    />
                    <label htmlFor="office">OFFICE</label>
                  </div>
                  <div className={styles.element}>
                    <input
                      type="radio"
                      id="other"
                      name="position"
                      onChange={fillData}
                    />
                    <label htmlFor="other">OTHER</label>
                  </div>
                </div>
                <div className={styles.address_item}>
                  <button type="reset">CANCEL</button>
                  <button onClick={handleSubmit}>SAVE</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Address;
