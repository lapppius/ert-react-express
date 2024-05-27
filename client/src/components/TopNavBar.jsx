import { NavLink, useNavigate } from "react-router-dom";
import styles from "./TopNavBar.module.css";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";

export default function TopNavBar() {
  const authContext = useAuth();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };
  const profile = () => {
    navigate("/Profile");
  };

  return (
    <>
      <header className={"header"}>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive ? "active" : undefined
                }
              >
                Ραδιόφωνα
              </NavLink>
            </li>
          </ul>
          {/* <ul className={styles.LoginSignUpButtons}>
            {authContext.currentUser === null ? (
              <>
                <li>
                  <NavLink
                    to={"/Login"}
                    className={(navData) =>
                      navData.isActive
                        ? `active ${styles.loginButton}`
                        : styles.loginButton
                    }
                  >
                    Login
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/Signup"}
                    className={(navData) =>
                      navData.isActive ? "active" : undefined
                    }
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            ) : authContext.currentUser === undefined ? (
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Box>
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    animation="wave"
                  >
                    <Avatar />
                  </Skeleton>
                </Box>
              </li>
            ) : authContext.currentUser !== undefined &&
              authContext.currentUser.email !== null ? (
              <li>
                {authContext.currentUser ? (
                  <Box>
                    <Tooltip title={authContext.currentUser.email}>
                      <IconButton
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <Avatar
                          src={authContext.currentUser.photoURL}
                          sx={{ width: 32, height: 32 }}
                        ></Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={(handleClose, profile)}>
                        Profile
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={(handleClose, handleLogout)}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <></>
                )}
              </li>
            ) : (
              "login"
            )}
          </ul> */}
        </nav>
      </header>
    </>
  );
}
