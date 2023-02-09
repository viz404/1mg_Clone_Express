export const logOutAction = () => {
  document.cookie = "onemg_session=";
  localStorage.removeItem("onemg_session");
  return {
    type: "LOGOUT_USER",
  };
};

export const logInAction = (payload) => {
  return {
    type: "LOGIN_USER",
    payload,
  };
};
