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

const FilterGender = () => {
  const { filters } = useSelector((store) => store.products);

  const data = removeDuplicate(filters.genders || []);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  let selectedGender = params.filterGender || "";

  const handleSearchParam = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    const genderParamArray = selectedGender.split(",");
    let paramValue = "";

    if (checked) {
      if (genderParamArray[0] == "") {
        paramValue = value;
      } else {
        paramValue = genderParamArray.join(",") + "," + value;
      }
      setSearchParams({
        ...params,
        filterGender: paramValue,
      });
    } else {
      let removedParams = genderParamArray.filter((e) => e != value);

      if (removedParams.length == 0) {
        delete params.filterGender;
        setSearchParams(params);
      } else {
        setSearchParams({
          ...params,
          filterGender: removedParams.join(","),
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
              params.filterGender?.split(",").includes(element) ? true : false
            }
            onChange={handleSearchParam}
          />
          <label htmlFor={element}>{element}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterGender;
