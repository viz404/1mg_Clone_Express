import styles from "../../styles/navbar/SubNavTwo.module.css";

import { ImLocation } from "react-icons/im";
import { MdMyLocation } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const fetchData = async (search, setter) => {
  try {
    const response = await fetch(BASE_URL + `/api/products?search=${search}`);
    const { data } = await response.json();
    const result = data.map((element) => element.title);
    setter([search, ...result]);
  } catch (error) {}
};

const SubNavTwo = () => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const timerRef = useRef();

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (search.trim().length > 0) {
      timerRef.current = setTimeout(() => {
        fetchData(search, setList);
      }, 700);
    } else {
      setList([]);
    }
  }, [search]);

  const redirect = (search) => {
    navigate(`/products?search=${search}`);
  };

  const fillSearch = (e) => {
    const key = e.key;
    const value = e.target.value;
    setSearch(value);
    if (key == "Enter" && value.trim().length > 0) {
      setList([]);
      clearTimeout(timerRef.current);
      redirect(value);
    }
  };

  const handleClick = (e) => {
    setList([]);
    if (search.trim().length > 0) {
      clearTimeout(timerRef.current);
      redirect(search);
    }
  };

  const searchResult = (index) => {
    redirect(list[index]);
    setSearch("");
    setList([]);
  };

  return (
    <div className={styles.subnavtwo}>
      <div className={styles.left}>
        <div className={styles.city}>
          <div className={styles.item}>
            <ImLocation />
          </div>
          <div className={styles.item}>New Delhi</div>
          <div className={styles.item}>
            <MdMyLocation />
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Search for Medicines and Health Products"
              onKeyUp={fillSearch}
            />
          </div>
          <div className={styles.button}>
            <FiSearch onClick={handleClick} />
          </div>
          <div className={styles.list}>
            {list.map((element, index) => (
              <div
                className={styles.listItem}
                onClick={() => searchResult(index)}
                key={index}
              >
                <p>{element}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightitem}>
          <img src="https://onemg.gumlet.io/quick_buy_rebrand_lqpnce.svg" />
          <p> QUICK BUY! Get 25% off on medicines*</p>
        </div>
        <div className={styles.rightitem}>
          <button>Quick Order</button>
        </div>
      </div>
    </div>
  );
};

export default SubNavTwo;
