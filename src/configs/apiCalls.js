const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const getSingleProduct = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/api/products/" + id);
    const { data, status, message } = await response.json();
    if (status == false) {
      throw new Error(message);
    }
    return { data, status: true };
  } catch (error) {
    // console.log(error.message);
    return { status: false };
  }
};

export const getUserDetails = async ({ token }) => {
  try {
    let temp_token = token;
    if (token == undefined) {
      temp_token = JSON.parse(localStorage.getItem("onemg_session")) || "";
    }

    if (temp_token == "") {
      throw new Error("user not logged in");
    }

    const response = await fetch(BASE_URL + "/api/user/getuserdetails", {
      headers: {
        authorization: `Bearer ${temp_token}`,
      },
    });

    const { user, status, message } = await response.json();

    if (status == false) {
      throw new Error(message);
    }

    localStorage.setItem("onemg_session", JSON.stringify(temp_token));

    return {
      user,
      status,
    };
  } catch (error) {
    // console.log(error.message);
    return {
      status: false,
    };
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await fetch(BASE_URL + "/api/user/registeruser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const { message, status } = await response.json();

    if (status == false) {
      throw new Error(message);
    }

    return {
      status: true,
    };
  } catch (error) {
    // console.log(error.message);
    return {
      status: false,
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await fetch(BASE_URL + "/api/user/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const { message, status, token } = await response.json();

    if (status == false) {
      throw new Error(message);
    }

    localStorage.setItem("onemg_session", JSON.stringify(token));

    return {
      status: true,
    };
  } catch (error) {
    // console.log(error.message);
    return {
      status: false,
    };
  }
};

export const addtoCart = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("onemg_session")) || "";
    const response = await fetch(BASE_URL + "/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const { message, status } = await response.json();

    if (status == false) {
      throw new Error(message);
    }

    return {
      status,
      message,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export const getCart = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("onemg_session")) || "";

    const response = await fetch(BASE_URL + "/api/cart/getcart", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const { data, message, status } = await response.json();

    if (status == false) {
      throw new Error(message);
    }

    return {
      data,
      status: true,
      message: message,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export const apiUpdateCartItemQuantity = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("onemg_session")) || "";

    let negativeCheck = payload.currentQuantity + payload.quantity >= 1;

    if (negativeCheck == false) {
      return {
        status: false,
        message: "can't change quantity",
      };
    }

    const response = await fetch(BASE_URL + "/api/cart/updatequantity", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const { status, message } = await response.json();

    if (status == false) {
      throw new Error(message);
    }

    return { status: true };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export const apideleteCartItem = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("onemg_session")) || "";

    const response = await fetch(BASE_URL + "/api/cart/deleteitem", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const { status, message } = await response.json();

    if (status == false) {
      throw new Error("delete failed");
    }

    return { status: true };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export const deleteCart = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("onemg_session")) || "";
    const response = await fetch(BASE_URL + "/api/cart/emptycart", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const { status, message } = await response.json();

    return { status, message };
  } catch (error) {
    // console.log(error.message);
    return { status: false };
  }
};
