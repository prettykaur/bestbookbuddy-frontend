import { useAuth0 } from "@auth0/auth0-react";
import { Rating, Stack, TextField, Typography } from "@mui/material";
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

export default function AddReviewDialog({
  open,
  closeDialog,
  updateData,
  bookId,
  editMode = true,
  reviewInfo,
}) {
  const userInfoContext = useContext(UserInfoContext);

  const [formInputs, setFormInputs] = useState({
    title: "",
    body: "",
    rating: 0,
  });
  const [isLoadingData, setIsLoadingData] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (editMode) {
      setFormInputs({
        title: reviewInfo?.title,
        body: reviewInfo?.body,
        rating: reviewInfo?.rating,
      });
    }
  }, []);

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
      `${BACKEND_URL}/reviews/${bookId}`,
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
      `${BACKEND_URL}/reviews/${reviewInfo?.id}`,
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
      <DialogTitle id="responsive-dialog-title">Add A Review</DialogTitle>
      <DialogContent>
        <Stack spacing={2} p={1}>
          <FormInputField
            label={"Title"}
            name={"title"}
            value={formInputs.title}
            onChange={handleChange}
          />
          <Rating
            name="rating"
            value={formInputs.rating}
            onChange={handleChange}
          />
          <TextField
            required
            name="body"
            placeholder="Let us know what you think!"
            variant="outlined"
            size="small"
            value={formInputs.body}
            onChange={handleChange}
            multiline
            minRows={6}
            helperText={"Was it good? Was it bad?"}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          disabled={isLoadingData ? true : false}
          onClick={editMode ? handleEdit : handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
