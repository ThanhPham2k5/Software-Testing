import { useState } from "react";
import "../styles/pages/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword } from "../utils/validate/validatePassword";
import { validateUsername } from "../utils/validate/validateUsername";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const navigate = useNavigate();

  function seenPassword() {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (
      validateUsername(username) === "username hop le" &&
      validatePassword(password) === "password hop le"
    ) {
      setErrorUsername("");
      setErrorPassword("");

      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            username: username,
            password: password,
          }
        );
        setApiMessage(response.data.message);
        navigate("/admin/dashboard");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setApiMessage(error.response.data.message);
        } else {
          setApiMessage("Da co loi xay ra, vui long thu lai");
        }
      }
    } else {
      setErrorUsername(validateUsername(username));
      setErrorPassword(validatePassword(password));
    }
  }

  return (
    <>
      <div className="login">
        <div className="glastic">
          <div className="pic">
            <Link to={"/"} className="pic-button">
              <div className="pic-button-name">Back to website</div>
              <img
                data-testid="back-arrow"
                src="/arrow-long.svg"
                alt="arrow-long"
                className="pic-button-ico"
              />
            </Link>
            <img
              data-testid="back-img"
              src="/pic-img.svg"
              alt="pic-img"
              className="pic-img"
            />
          </div>

          <form className="form">
            <div className="form-title">Sign in with email</div>
            <div className="form-slogan">
              Where every page begins a journey.
            </div>
            <div className="form-user">
              <img
                src="/form-user-ico.svg"
                alt="form-user-ico"
                className="form-user-ico"
              />
              <input
                data-testid="username-input"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                autoComplete="off"
                className="form-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {errorUsername !== "username hop le" ? (
              <div className="form-user-error" data-testid="username-test">
                {errorUsername}
              </div>
            ) : null}

            <div className="form-pass">
              <img
                src="/form-pass-ico.svg"
                alt="form-pass-ico"
                className="form-pass-ico"
              />
              {showPassword ? (
                <>
                  <input
                    data-testid="password-input"
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src="/form-show-ico.svg"
                    alt="form-eye-ico"
                    className="form-eye-ico"
                    onClick={() => seenPassword()}
                  />
                </>
              ) : (
                <>
                  <input
                    data-testid="password-input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src="/form-hidden-ico.svg"
                    alt="form-eye-ico"
                    className="form-eye-ico"
                    onClick={() => seenPassword()}
                  />
                </>
              )}
            </div>

            {errorPassword !== "password hop le" ? (
              <div className="form-pass-error" data-testid="password-test">
                {errorPassword}
              </div>
            ) : null}

            <button
              className="form-button"
              data-testid="form-button"
              onClick={(e) => onSubmit(e)}
            >
              <div className="form-button-name">Get Started</div>
            </button>

            {apiMessage && <p data-testid="api-message">{apiMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
