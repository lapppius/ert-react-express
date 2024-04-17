import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Alert,
  Box,
  Modal,
  Typography,
  AlertTitle,
} from "@mui/material";
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

export default function DeleteRadio(props) {
  const authContext = useAuth();
  const [alertInfo, setAlertInfo] = useState({ severity: null, message: null });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDeleteThisRadio = () => {
    if (!authContext.currentUser) return;
    setLoading(true);
    fetch(`/api/radios/id/${props.radio.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.currentUser.accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setLoading(false);
          return response.json();
        }
        throw Error("An error occurred while deleting a radio.");
      })
      .then((res) => {
        setAlertInfo({
          severity:
            res.status == 200
              ? "success"
              : res.status == 302
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
        setLoading(false);
      });
  };

  const handleOpen = () => {
    setOpen(true);
    setAlertInfo({ severity: null, message: null });
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Button onClick={handleOpen}>Διαγραφη</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={1}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Διαγραφή {props.radio.name}
            </Typography>
            <LoadingButton
              variant="outlined"
              loading={loading}
              onClick={handleDeleteThisRadio}
            >
              Οριστικη Διαγραφη
            </LoadingButton>
            {alertInfo.message != null && (
              <Alert severity={alertInfo.severity} variant="outlined">
                {alertInfo.message}
              </Alert>
            )}
            <Button onClick={() => setOpen(false)} variant="contained">
              Cancel
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
