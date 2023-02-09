import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getUserDetails,
  loginUser,
  registerUser,
} from "../../configs/apiCalls";
import { IoPersonOutline } from "react-icons/io5";
import { logInAction, logOutAction } from "../../redux/user/userActions";

import styles from "../../styles/navbar/SignIn.module.css";
import { setCartSuccess } from "../../redux/cart/cartActions";
import Alert from "../common/Alert";
import { useSearchParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=711499022977-4fafqra7jojd83q2ud53c8cqkdmbe56h.apps.googleusercontent.com&redirect_uri=${
  BASE_URL + "/api/oauth/google"
}&response_type=code&prompt=consent&scope=profile%20email`;

const SignIn = () => {
  const [loginSelected, setSelect] = useState(true);
  const [blur, setBlur] = useState(false);
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [searchParams] = useSearchParams();
  const [popup, setpopup] = useState({
    status: false,
    message: "",
  });

  const { isLoggedIn } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const fetchUser = async () => {
      const { user, status } = await getUserDetails({ token });

      if (status) {
        dispatch(logInAction(user));
      }
    };
    fetchUser();
  }, [refresh]);

  const handleSubmit = async () => {
    if (loginSelected) {
      const { email, password } = user;

      const { status } = await loginUser({ email, password });

      if (status) {
        setBlur(false);
        setRefresh(!refresh);

        setpopup({
          status: true,
          message: "login success",
        });
      } else {
        setpopup({
          status: true,
          message: "login failed",
        });
      }
    } else {
      const { name, email, password } = user;

      const { status } = await registerUser({ name, email, password });

      if (status) {
        setpopup({
          status: true,
          message: "User successfully registered",
        });
        setSelect(true);
      } else {
        setpopup({
          status: true,
          message: "registeration failed",
        });
      }
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    user[name] = value;
    setUser({ ...user });
  };

  const logoutFunc = () => {
    dispatch(logOutAction());
    dispatch(setCartSuccess([]));
  };

  return (
    <div>
      <Alert
        message={popup.message}
        showPopUp={popup.status}
        onButtonClick={() => setpopup(false)}
      />
      {isLoggedIn ? (
        <div className={styles["loggedin"]}>
          <IoPersonOutline />|
          <div className={styles.logout_container}>
            <p onClick={logoutFunc}>Log Out</p>
          </div>
        </div>
      ) : (
        <button className={styles.btn} onClick={() => setBlur(true)}>
          Sign in
        </button>
      )}
      {blur && (
        <div className={styles.backdrop} onClick={() => setBlur(false)}>
          <div
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Login</h2>
            <div className={styles.switch}>
              <button
                className={loginSelected ? styles.btn : ""}
                onClick={() => setSelect(true)}
              >
                Login
              </button>
              <button
                className={loginSelected == false ? styles.btn : ""}
                onClick={() => setSelect(false)}
              >
                Sign Up
              </button>
            </div>
            <form
              method="post"
              onSubmit={(e) => e.preventDefault()}
              className={styles.form}
            >
              {loginSelected === false && (
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  required
                  onChange={handleInput}
                />
              )}
              <input
                type="email"
                placeholder="example@email.com"
                name="email"
                required
                onChange={handleInput}
              />
              <input
                type="password"
                placeholder="super secret password"
                name="password"
                required
                onChange={handleInput}
              />
              <button
                type="submit"
                className={styles.btn}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <div className={styles["google-container"]}>
                <a href={OAUTH_URL}>
                  <p>Sign in with Google</p>
                  <img
                    src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                    alt=""
                  />
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
