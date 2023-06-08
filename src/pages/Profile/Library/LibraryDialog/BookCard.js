import { useAuth0 } from "@auth0/auth0-react";
import { Delete, DriveFileMoveRounded } from "@mui/icons-material";
import { IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { BACKEND_URL } from "../../../../data/constants";
import { UserInfoContext } from "../../../../contexts/UserInfoProvider";

const status = [
  { id: 1, label: "Want To Read", value: "to-read" },
  { id: 2, label: "Reading", value: "reading" },
  { id: 3, label: "Read", value: "read" },
  { id: 4, label: "Did Not Finish", value: "dnf" },
];

function BookCard({ bookInfo }) {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();

  const userInfoContext = useContext(UserInfoContext);

  const handleDelete = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/${userInfoContext.userInfo.id}/${bookInfo?.id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleMove = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    try {
      const response = await axios.put(
        `${BACKEND_URL}/${userInfoContext.userInfo.id}/${bookInfo?.id}`
      );
    } catch (err) {
      console.log(err);
    }
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
            {bookInfo?.title}
          </Typography>
          <Typography variant="caption">{bookInfo?.authorName}</Typography>
        </Stack>
        <Stack direction={"row"}>
          <Tooltip title="Move" arrow>
            <IconButton>
              <DriveFileMoveRounded />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" arrow>
            <IconButton>
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default BookCard;
