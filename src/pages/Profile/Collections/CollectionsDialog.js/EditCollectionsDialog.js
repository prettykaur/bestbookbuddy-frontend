import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../../../contexts/UserInfoProvider";
import { CollectionsContext } from "../ProfileCollections";
import { BACKEND_URL } from "../../../../data/constants";
import FormInputField from "../../../../common/ui/FormInputField";
import CollectionCard from "./CollectionCard";

export default function EditCollectionsDialog({ open, setOpenDialog }) {
  const userInfoContext = useContext(UserInfoContext);
  const collectionsContext = useContext(CollectionsContext);

  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
  });

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

    const response = await axios.post(
      `${BACKEND_URL}/collections`,
      {
        userId: userInfoContext?.userInfo?.id,
        name: formInputs.name,
        description: formInputs.description,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data);
    console.log(`create collection request success`);

    collectionsContext?.setUpdateData((prevState) => !prevState);
    setOpenDialog(false);
  };

  const updateData = () => {
    collectionsContext?.setUpdateData((prevState) => !prevState);
  };
  const closeDialog = () => {
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
      <DialogTitle id="responsive-dialog-title">Edit Collection</DialogTitle>
      <DialogContent>
        <Stack spacing={2} p={1}>
          {collectionsContext.collectionsInfo.length === 0 && (
            <Typography>No collections found!</Typography>
          )}
          {collectionsContext.collectionsInfo.length !== 0 &&
            collectionsContext.collectionsInfo.map((collection) => (
              <CollectionCard
                key={collection.id}
                name={collection.name}
                collectionId={collection.id}
                userId={userInfoContext?.userInfo?.id}
                updateData={updateData}
                closeDialog={closeDialog}
              />
            ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpenDialog(false)}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
