import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UserInfoContext } from "../../contexts/UserInfoProvider";
import FormInputField from "../../common/ui/FormInputField";
import axios from "axios";
import { BACKEND_URL } from "../../data/constants";

export default function EditProfileDialog({
  open,
  setOpenDialog,
  setUpdateData,
  updateData,
}) {
  const userInfoContext = useContext(UserInfoContext);

  const [formInputs, setFormInputs] = useState({
    username: userInfoContext?.userInfo?.username ?? "",
    email: userInfoContext?.userInfo?.email ?? "",
    bio: userInfoContext?.userInfo?.bio ?? "",
    address: userInfoContext?.userInfo?.address ?? "",
    photoUrl: userInfoContext?.userInfo?.photoUrl ?? "",
  });
  const [isLoadingData, setIsLoadingData] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();

  const handleChange = (e) => {
    setFormInputs((prevInputs) => {
      return {
        ...prevInputs,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.put(
      `${BACKEND_URL}/users/${userInfoContext.userInfo.id}`,
      {
        username: formInputs.username,
        email: formInputs.email,
        bio: formInputs.bio,
        address: formInputs.address,
        photoUrl: formInputs.photoUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data);
    console.log(`updated profle success`);

    userInfoContext?.setUserInfo(response.data);
    setUpdateData((prevState) => !prevState);
    setOpenDialog(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      //   onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="responsive-dialog-title">Edit Profile</DialogTitle>
      <DialogContent>
        <Stack spacing={2} p={1}>
          <FormInputField
            label={"Username"}
            name={"username"}
            value={formInputs.username}
            onChange={handleChange}
          />
          <FormInputField
            disabled={true}
            label={"Email"}
            name={"email"}
            value={formInputs.email}
            onChange={handleChange}
          />
          <FormInputField
            label={"Address"}
            name={"address"}
            value={formInputs.address}
            onChange={handleChange}
            helperText={"*For shipping purposes"}
          />
          <FormInputField
            label={"PhotoUrl"}
            name={"photoUrl"}
            value={formInputs.photoUrl}
            onChange={handleChange}
          />
          <TextField
            required
            name="bio"
            label="Bio"
            variant="outlined"
            size="small"
            value={formInputs.bio}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpenDialog(false)}>
          Cancel
        </Button>
        <Button
          autoFocus
          startIcon={isLoadingData ? <CircularProgress /> : null}
          onClick={handleSubmit}
          disabled={isLoadingData ? true : false}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
