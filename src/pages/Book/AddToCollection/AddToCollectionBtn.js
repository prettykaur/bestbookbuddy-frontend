import { PlaylistAddRounded } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../../data/constants";
import { UserInfoContext } from "../../../contexts/UserInfoProvider";
import { useAuth0 } from "@auth0/auth0-react";

export default function AddToCollectionBtn({ bookId }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [updateData, setUpdateData] = useState(true);
  const [collectionsInfo, setCollectionsInfo] = useState([]);

  const userInfoContext = useContext(UserInfoContext);

  useEffect(() => {
    const fetchCollectionsData = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      const response = await axios.get(
        `${BACKEND_URL}/collections/${userInfoContext?.userInfo?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setCollectionsInfo(response.data);
      console.log(collectionsInfo);
    };

    if (isAuthenticated && userInfoContext.userInfo !== "hello") {
      fetchCollectionsData();
    }
  }, [isAuthenticated, updateData, userInfoContext.userInfo]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCollectionClick = async (collectionId) => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/collections/${userInfoContext.userInfo.id}/${collectionId}`,
        {
          bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("added book to collection!");
      console.log(response.data);
      setUpdateData((prevState) => !prevState);
    } catch (err) {
      console.log(err);
    }

    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Add to Collection" arrow>
        <IconButton color="primary" onClick={handleClick}>
          <PlaylistAddRounded />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {collectionsInfo.length === 0 && (
          <MenuItem>No collections found!</MenuItem>
        )}
        {collectionsInfo.length !== 0 &&
          collectionsInfo.map((collection) => (
            <MenuItem
              key={collection.id}
              onClick={() => handleCollectionClick(collection.id)}
            >
              <Typography variant="caption">{collection.name}</Typography>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
