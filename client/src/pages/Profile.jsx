import { useEffect, useRef, useState } from "react";
import { upload, auth, deleteP } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, Checkbox } from "@mui/material";
import { updateCurrentUser, updateProfile } from "firebase/auth";

const Profile = () => {
  const authContext = useAuth();
  const { logout } = useAuth();
  const emailRef = useRef();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  let [loading, setLoading] = useState(false);
  let [userPhoto, setUserPhoto] = useState(undefined);
  let [userPhotoURL, setUserPhotoURL] = useState(undefined);

  let [progress, setProgress] = useState(0);
  const fileRef = useRef();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {}
  };

  function handleChange(e) {
    e.preventDefault();
    if (fileRef.current.files[0]) {
      let src = window.URL.createObjectURL(fileRef.current.files[0]);
      setUserPhoto(fileRef.current.files[0]);
      setUserPhotoURL(src);
    }
  }

  function handleClick() {
    upload(userPhoto, authContext.currentUser, setLoading, setProgress);
    setUserPhotoURL(authContext.currentUser.photoURL);
  }

  function deletePhoto() {
    deleteP(authContext.currentUser.photoURL, authContext.currentUser);
    setUserPhotoURL(undefined);
    setUserPhoto(undefined);
  }

  useEffect(() => {
    if (!loading) {
      fileRef.current.value = null;
    }
  }, [loading]);

  useEffect(() => {
    if (authContext.currentUser) {
      authContext.currentUser.getIdTokenResult().then((idtoken) => {
        setIsAdmin(idtoken.claims.admin);
      });
    }
  }, [authContext]);

  return (
    <>
      <nav>
        <div>
          {authContext.currentUser ? (
            <Avatar
              loading="lazy"
              alt={authContext.currentUser.email + "'s profile photo"}
              src={
                userPhotoURL ? userPhotoURL : authContext.currentUser.photoURL
              }
              sx={{ width: 100, height: 100 }}
            />
          ) : (
            <Skeleton variant="circular" width={70} height={70} />
          )}
          <input type="file" ref={fileRef} onChange={handleChange}></input>

          <button disabled={loading} onClick={handleClick}>
            upload
          </button>
          <span>{progress ? progress : undefined}</span>
          {authContext.currentUser.photoURL ? (
            <button onClick={deletePhoto}>Delete Photo</button>
          ) : undefined}
        </div>
      </nav>
      {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
    </>
  );
};

export default Profile;
