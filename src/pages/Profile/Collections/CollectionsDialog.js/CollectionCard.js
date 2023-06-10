import { useAuth0 } from "@auth0/auth0-react";
import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../../../../data/constants";

function CollectionCard({
  name,
  collectionId,
  userId,
  updateData,
  closeDialog,
}) {
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.delete(
      `${BACKEND_URL}/collections/${userId}/${collectionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    updateData();
    closeDialog();
  };

  return (
    <Paper elevation={3}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={1}
      >
        <Stack p={1}>
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {name}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default CollectionCard;
