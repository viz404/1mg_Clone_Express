const initialData = {
  name: "",
  email: "",
  isLoggedIn: false,
};

export const UserReducer = (state = initialData, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        name: action.payload.name,
        email: action.payload.email,
        isLoggedIn: true,
      };
    case "LOGOUT_USER":
      return {
        name: "",
        email: "",
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
