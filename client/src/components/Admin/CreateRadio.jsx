import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../contexts/AuthContext";
import ImagesList from "../Admin/ImagesList";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  overflowY: "auto",
  height: "100vh",
};

export default function CreateRadio({ handleRefresh }) {
  const authContext = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ severity: null, message: null });
  const [selected, setSelected] = useState(null);

  const addRadio = () => {
    if (formData == null) return;
    if (!authContext.currentUser) {
      console.log("not logged in");
      return;
    } else {
      authContext.currentUser.getIdTokenResult().then((idToken) => {
        console.log(idToken.token);
      });
    }

    setLoading(true);
    fetch("/api/radios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setAlertInfo({
          severity:
            res.status == 201
              ? "success"
              : res.status == 302
              ? "warning"
              : "info",
          message: res.message,
        });
        setLoading(false);

        setTimeout(() => {
          handleClose();
          handleRefresh();
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        setAlertInfo({ severity: "error", message: error.message });
      });
  };

  const fields = ["name", "logoURL", "streamURL", "wikidataId", "epgId"];
  const handleOpen = () => {
    setFormData(null);
    setOpen(true);
    setAlertInfo({ severity: null, message: null });
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectedImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      ["logoURL"]: selected ? selected : prevState?.logoURL,
    }));
  };

  useEffect(() => {
    handleSelectedImage();
  }, [selected]);

  return (
    <div>
      <Button onClick={handleOpen}>Add New Radio</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display="flex" flexDirection="column" gap={1}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Προσθήκη Ραδιοφώνου
          </Typography>
          {fields.map((field) => (
            <TextField
              label={field}
              key={field}
              name={field}
              value={formData?.[field] || ""}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          ))}
          <ImagesList setSelected={setSelected} />
          <LoadingButton
            variant="contained"
            onClick={addRadio}
            loading={loading}
          >
            Αποθήκευση
          </LoadingButton>
          {alertInfo.message != null && (
            <Alert severity={alertInfo.severity} variant="outlined">
              {alertInfo.message}
            </Alert>
          )}
        </Box>
      </Modal>
    </div>
  );
}
