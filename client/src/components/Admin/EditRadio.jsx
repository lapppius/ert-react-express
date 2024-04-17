import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../contexts/AuthContext";

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
};

export default function EditRadio(props) {
  const authContext = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedRadioData, setUpdatedRadioData] = useState();
  const [alertInfo, setAlertInfo] = useState({ severity: null, message: null });

  const handleOpen = () => {
    setOpen(true);
    setAlertInfo({ severity: null, message: null });
  };
  const handleClose = () => setOpen(false);

  const handleFieldChange = (key, value) => {
    for (let k in updatedRadioData) {
      if (updatedRadioData.hasOwnProperty(key)) {
        updatedRadioData[key] = value;
      }
    }
    console.log(key);
  };

  const handleSaveEdit = () => {
    if (!authContext.currentUser) {
      console.log("not logged in");
      return;
    }
    setLoading(true);
    fetch(`/api/radios/id/${encodeURI(props.radio.id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.currentUser.accessToken}`,
      },
      body: JSON.stringify(updatedRadioData),
    })
      .then((response) => {
        if (response.ok) {
          setLoading(false);
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setAlertInfo({
          severity:
            res.status == 200
              ? "success"
              : res.status == 404
              ? "warning"
              : "info",
          message: res.message,
        });
        setTimeout(() => {
          props.handleRefresh();
          handleClose();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error updating radio:", error);
      });
  };

  useEffect(() => {
    setUpdatedRadioData(props.radio);
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>Επεξεργασια</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          gap={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Επεξεργασία {props.radio.radioName}
          </Typography>
          {Object.entries(props.radio).map(([key, value]) => (
            <TextField
              label={key}
              defaultValue={value}
              key={key}
              onChange={(e) => {
                handleFieldChange(key, e.target.value);
              }}
            />
          ))}
          <LoadingButton
            variant="contained"
            onClick={handleSaveEdit}
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
