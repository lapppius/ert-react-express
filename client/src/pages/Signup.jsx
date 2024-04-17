import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField, Button, Card } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import styles from "./LoginSignUp.module.css";
import { LoadingButton } from "@mui/lab";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      console.log("true");
      return setError("Password and Confirm Password do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Error in signin up");
    }
    setLoading(false);
  };

  return (
    <section className={styles.card_section}>
      <Card variant="outlined" className={styles.card}>
        <h1> Sign Up </h1>
        {error}
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            required
            placeholder="Email address"
            inputRef={emailRef}
          />
          <TextField
            label="Create Password"
            id="outlined-basic"
            name="password"
            type="password"
            required
            placeholder="Password"
            inputRef={passwordRef}
          ></TextField>

          <TextField
            label="Confirm Password"
            id="outlined-basic"
            name="confirmPassword"
            type="password"
            required
            placeholder="Confirm Password"
            inputRef={confirmPasswordRef}
          ></TextField>

          <LoadingButton
            variant="contained"
            loading={loading}
            type="submit"
            className={styles.login_button}
          >
            Sign Up
          </LoadingButton>
        </form>

        <p>
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </Card>
    </section>
  );
};

export default Signup;
