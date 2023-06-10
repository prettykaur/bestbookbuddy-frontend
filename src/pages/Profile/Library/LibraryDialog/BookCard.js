import { useAuth0 } from "@auth0/auth0-react";
import { Delete, DriveFileMoveRounded } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BACKEND_URL } from "../../../../data/constants";
import { UserInfoContext } from "../../../../contexts/UserInfoProvider";
import { LibraryContext } from "../ProfileLibrary";

const status = [
  { id: 1, label: "Want To Read", value: "to-read" },
  { id: 2, label: "Reading", value: "reading" },
  { id: 3, label: "Read", value: "read" },
  { id: 4, label: "Did Not Finish", value: "dnf" },
];

function BookCard({ bookInfo, closeDialog }) {
  const { getAccessTokenSilently } = useAuth0();

  const userInfoContext = useContext(UserInfoContext);
  const updateData = useContext(LibraryContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/library/${userInfoContext.userInfo.id}/${bookInfo?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);

      updateData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMove = async (selectedStatus) => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    try {
      const response = await axios.put(
        `${BACKEND_URL}/library/${userInfoContext.userInfo.id}/${bookInfo?.id}`,
        {
          currentStatus: bookInfo?.status,
          newStatus: selectedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      updateData();
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
          <Typography variant="caption">
            {bookInfo?.authorName?.split(",")[0] ||
              bookInfo?.author?.split(",")[0]}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <Tooltip title="Move" arrow>
            <IconButton color="primary" onClick={handleClick}>
              <DriveFileMoveRounded />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" arrow>
            <IconButton color="primary" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {status.map((option) => (
          <MenuItem key={option.value} onClick={() => handleMove(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
}

export default BookCard;
