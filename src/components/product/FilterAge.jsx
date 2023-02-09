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

const FilterAge = () => {
  const { filters } = useSelector((store) => store.products);

  const data = removeDuplicate(filters.ages || []);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  let selectedAge = params.filterAge || "";

  const handleSearchParam = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    const ageParamArray = selectedAge.split(",");
    let paramValue = "";

    if (checked) {
      if (ageParamArray[0] == "") {
        paramValue = value;
      } else {
        paramValue = ageParamArray.join(",") + "," + value;
      }
      setSearchParams({
        ...params,
        filterAge: paramValue,
      });
    } else {
      let removedParams = ageParamArray.filter((e) => e != value);

      if (removedParams.length == 0) {
        delete params.filterAge;
        setSearchParams(params);
      } else {
        setSearchParams({
          ...params,
          filterAge: removedParams.join(","),
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      {data.map((element) => (
        <div className={styles.list} key={element}>
          <input
            type="checkbox"
            value={element}
            id={element}
            checked={
              params.filterAge?.split(",").includes(element) ? true : false
            }
            onChange={handleSearchParam}
          />
          <label htmlFor={element}>{element}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterAge;
