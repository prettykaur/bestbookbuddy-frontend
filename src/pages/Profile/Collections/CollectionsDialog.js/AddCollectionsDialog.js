import { useAuth0 } from "@auth0/auth0-react";
import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import React, { useContext, useState } from "react";
import FormInputField from "../../../../common/ui/FormInputField";
import { UserInfoContext } from "../../../../contexts/UserInfoProvider";
import { BACKEND_URL } from "../../../../data/constants";
import { CollectionsContext } from "../ProfileCollections";

export default function AddCollectionsDialog({ open, setOpenDialog }) {
  const userInfoContext = useContext(UserInfoContext);
  const collectionsContext = useContext(CollectionsContext);

  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
  });
  const [isLoadingData, setIsLoadingData] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { getAccessTokenSilently } = useAuth0();

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
    setIsLoadingData(true);

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
    setIsLoadingData(false);
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
      <DialogTitle id="responsive-dialog-title">
        Create New Collection
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} p={1}>
          <FormInputField
            label={"Name"}
            name={"name"}
            value={formInputs.name}
            onChange={handleChange}
          />
          <TextField
            required
            name="description"
            label="Description"
            variant="outlined"
            size="small"
            value={formInputs.description}
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
        <Button disabled={isLoadingData ? true : false} onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
