import { useAuth0 } from "@auth0/auth0-react";
import { Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FormInputField from "../../../../common/ui/FormInputField";
import { UserInfoContext } from "../../../../contexts/UserInfoProvider";
import { BACKEND_URL } from "../../../../data/constants";
import { useParams } from "react-router-dom";

export default function AddDiscussionDialog({ open, closeDialog, updateData }) {
  const userInfoContext = useContext(UserInfoContext);
  const { bookId } = useParams();

  const [formInputs, setFormInputs] = useState({
    title: "",
    body: "",
  });
  const [isLoadingData, setIsLoadingData] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { getAccessTokenSilently } = useAuth0();

  const handleChange = (e) => {
    setFormInputs((prevInputs) => {
      return {
        ...prevInputs,
        [e.target.name]:
          e.target.name === "rating" ? Number(e.target.value) : e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingData(true);

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.post(
      `${BACKEND_URL}/discussions/${bookId}`,
      {
        title: formInputs.title,
        body: formInputs.body,
        userId: userInfoContext?.userInfo?.id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data);
    console.log(`add review request success`);

    updateData();
    setIsLoadingData(false);
    closeDialog();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoadingData(true);

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.put(
      `${BACKEND_URL}/reviews/$ discussionData?.id}`,
      {
        title: formInputs.title,
        body: formInputs.body,
        rating: formInputs.rating,
        userId: userInfoContext?.userInfo?.id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    updateData();
    setIsLoadingData(false);
    closeDialog();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      //   onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle id="responsive-dialog-title">New Discussion</DialogTitle>
      <DialogContent>
        <Stack spacing={2} p={1}>
          <FormInputField
            label={"Title"}
            name={"title"}
            value={formInputs.title}
            onChange={handleChange}
          />
          <TextField
            required
            name="body"
            placeholder="What is on your mind, my dude?"
            variant="outlined"
            size="small"
            value={formInputs.body}
            onChange={handleChange}
            multiline
            minRows={6}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeDialog}>
          Cancel
        </Button>
        <Button disabled={isLoadingData ? true : false} onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
