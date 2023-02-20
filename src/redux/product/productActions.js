const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const setLoading = () => {
  return {
    type: "LOADING",
  };
};

const setError = () => {
  return {
    type: "ERROR",
  };
};

const setSuccess = (payload) => {
  return {
    type: "SUCCESS",
    payload,
  };
};

export const fetchCategory = (
  category,
  { filterAge, filterGender, sort, filterBrand }
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());

      let sortValue = "";
      let sortOrder = "";

      if (sort == "id") {
        sortValue = "id";
        sortOrder = "asc";
      } else if (sort == "rating") {
        sortValue = "rating";
        sortOrder = "desc";
      } else if (sort == "low-high") {
        sortValue = "price";
        sortOrder = "asc";
      } else if (sort == "high-low") {
        sortValue = "price";
        sortOrder = "desc";
      } else if (sort == "discount") {
        sortValue = "discount";
        sortOrder = "desc";
      }

      const response = await fetch(
        BASE_URL +
          `/api/products?category=${category}${
            filterAge ? "&age=" + filterAge : ""
          }${filterGender ? "&gender=" + filterGender : ""}${
            filterBrand ? "&brand=" + filterBrand : ""
          }${sort ? "&sort=" + sortValue + "&order=" + sortOrder : ""}`
      );

      const { data, status, message } = await response.json();

      if (status == false) {
        // console.log(message);
        throw new Error();
      }

      dispatch(setSuccess(data));
    } catch (error) {
      dispatch(setError());
    }
  };
};

export const fetchSearchData = (
  search,
  { filterAge, filterGender, sort, filterBrand }
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());

      let sortValue = "";
      let sortOrder = "";

      if (sort == "id") {
        sortValue = "id";
        sortOrder = "asc";
      } else if (sort == "rating") {
        sortValue = "rating";
        sortOrder = "desc";
      } else if (sort == "low-high") {
        sortValue = "price";
        sortOrder = "asc";
      } else if (sort == "high-low") {
        sortValue = "price";
        sortOrder = "desc";
      } else if (sort == "discount") {
        sortValue = "discount";
        sortOrder = "desc";
      }

      const response = await fetch(
        BASE_URL +
          `/api/products?search=${search}${
            filterAge ? "&age=" + filterAge : ""
          }${filterGender ? "&gender=" + filterGender : ""}${
            filterBrand ? "&brand=" + filterBrand : ""
          }${sort ? "&sort=" + sortValue + "&order=" + sortOrder : ""}`
      );
      const { data, status, message } = await response.json();

      if (status == false) {
        // console.log(message);
        throw new Error();
      }

      dispatch(setSuccess(data));
    } catch (error) {
      dispatch(setError());
    }
  };
};

export const setFilters = ({ category, search }) => {
  return async (dispatch) => {
    try {
      if (category) {
        const response = await fetch(
          BASE_URL + "/api/products/getfilters?category=" + category
        );

        const { data, status, message } = await response.json();

        if (status == false) {
          // console.log(message);
          throw new Error();
        }

        dispatch({
          type: "SET_FILTER",
          payload: data,
        });
      } else if (search) {
        const response = await fetch(
          BASE_URL + "/api/products/getfilters?search=" + search
        );

        const { data, status, message } = await response.json();

        if (status == false) {
          // console.log(message);
          throw new Error();
        }

        dispatch({
          type: "SET_FILTER",
          payload: data,
        });
      }
    } catch (error) {
      // console.log(error.message);
    }
  };
};
