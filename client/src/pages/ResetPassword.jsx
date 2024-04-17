import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { TextField, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [labelError, setLabelError] = useState(undefined);
  const [URLparams] = useSearchParams();
  const [mode, setMode] = useState(undefined);
  const [emailReset, setEmailReset] = useState(undefined);
  const [newPassword, setNewPassword] = useState(undefined);
  const emailRef = useRef();
  const passwordRef = useRef(undefined);
  const confirmPasswordRef = useRef(undefined);
  const { resetPassword, confirmResetPassword, validatePasswordResetCode } =
    useAuth();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(emailRef.current.value);
      navigate("/Login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    mode == "resetPassword" &&
      Object.fromEntries([...URLparams]).oobCode &&
      newPassword !== undefined;
    try {
      await confirmResetPassword(
        Object.fromEntries([...URLparams]).oobCode,
        newPassword
      );
      navigate("/Login");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleKeyUp = async (e) => {
    passwordRef.current.value === confirmPasswordRef.current.value
      ? (setNewPassword(confirmPasswordRef.current.value),
        setLabelError(undefined))
      : confirmPasswordRef.current.value !== undefined &&
        passwordRef.current.value
      ? setLabelError("Password and comfirm password don't match")
      : undefined;
  };

  useEffect(() => {
    Object.fromEntries([...URLparams]).oobCode
      ? validatePasswordResetCode(Object.fromEntries([...URLparams]).oobCode)
          .then((res) => {
            Object.fromEntries([...URLparams]).mode && error == undefined
              ? setMode(Object.fromEntries([...URLparams]).mode)
              : undefined;
            setEmailReset(res);
          })
          .catch((error) => {
            setError(error.message);
            setMode("initialReset");
          })
      : setMode("initialReset");
  }, []);

  return (
    <>
      {error !== undefined ? (
        <Alert severity="error">{error}</Alert>
      ) : undefined}

      <form
        onSubmit={
          mode == "resetPassword"
            ? handleConfirmReset
            : mode == "initialReset"
            ? handleReset
            : undefined
        }
      >
        <p>Reset password{emailReset ? ` for ${emailReset}` : undefined}</p>
        {mode == "initialReset" ? (
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
        ) : mode == "resetPassword" ? (
          <>
            <TextField
              label="Create New Password"
              id="outlined-basic"
              name="password"
              type="password"
              required
              placeholder="New Password"
              inputRef={passwordRef}
            ></TextField>
            <TextField
              label="Confirm New Password"
              id="outlined-basic"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm New Password"
              inputRef={confirmPasswordRef}
              helperText={labelError}
              error={labelError}
              onKeyUp={handleKeyUp}
            ></TextField>
          </>
        ) : undefined}

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          // className={styles.login_button}
        >
          Reset Password
        </LoadingButton>
      </form>
    </>
  );
};
