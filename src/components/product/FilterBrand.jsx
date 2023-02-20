import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import styles from "../../styles/product/FilterAge.module.css";

const removeDuplicate = (array) => {
  const pure = [];

  for (let item of array) {
    if (pure.includes(item) == false) {
      pure.push(item);
    }
  }

  return pure;
};

const FilterBrand = () => {
  const { filters } = useSelector((store) => store.products);
  const [query, setQuery] = useState("");

  const data = removeDuplicate(
    filters.brands?.filter((e) =>
      e.toLowerCase().includes(query.toLowerCase())
    ) || []
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  let selectedBrand = params.filterBrand || "";

  const handleSearchParam = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    const brandParamArray = selectedBrand.split(",");
    let paramValue = "";

    if (checked) {
      if (brandParamArray[0] == "") {
        paramValue = value;
      } else {
        paramValue = brandParamArray.join(",") + "," + value;
      }
      setSearchParams({
        ...params,
        filterBrand: paramValue,
      });
    } else {
      let removedParams = brandParamArray.filter((e) => e != value);

      if (removedParams.length == 0) {
        delete params.filterBrand;
        setSearchParams(params);
      } else {
        setSearchParams({
          ...params,
          filterBrand: removedParams.join(","),
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["search-bar"]}>
        <input
          type="text"
          placeholder="Search Brand..."
          onKeyUp={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={styles["brand-container"]}>
        {data.map((element) => (
          <div className={styles.list} key={element}>
            <input
              type="checkbox"
              value={element}
              id={element}
              checked={
                params.filterBrand?.split(",").includes(element) ? true : false
              }
              onChange={handleSearchParam}
            />
            <label htmlFor={element}>{element}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBrand;
