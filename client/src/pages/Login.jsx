import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  TextField,
  Alert,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import styles from './LoginSignUp.module.css';
import { useAuth } from '../contexts/AuthContext';

export default () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const authContext = useAuth();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (authContext.currentUser) {
      authContext.currentUser
        .getIdTokenResult()
        .then((idtoken) => {
          return idtoken.claims.admin;
        })
        .then((res) => {
          if (res) {
            navigate('/Admin');
          } else {
            navigate('/Profile');
          }
        });
    }
  }, [authContext]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const handleClickShowPassword = (e) => {
    e.preventDefault();
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.card_section}>
      <Card variant="outlined" className={styles.card}>
        <h1> Login </h1>

        {error !== undefined ? <Alert severity="error">{error}</Alert> : ''}
        <form onSubmit={handleLogin}>
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
            label="Password"
            id="outlined-basic"
            name="password"
            type="password"
            required
            placeholder="Password"
            inputRef={passwordRef}
          ></TextField>
          {/* <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl> */}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            className={styles.login_button}
          >
            Login
          </LoadingButton>
        </form>
        <p className="text-sm text-white text-center">
          <NavLink to="/reset-password">Forgot Password?</NavLink>
        </p>
        <p className="text-sm text-white text-center">
          No account yet? <NavLink to="/signup">Sign up</NavLink>
        </p>
      </Card>
    </section>
  );
};
