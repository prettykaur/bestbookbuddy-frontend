import { Add } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../../data/constants";
import { UserInfoContext } from "../../../contexts/UserInfoProvider";
import { useAuth0 } from "@auth0/auth0-react";

const status = [
  { label: "Want To Read", value: "to-read" },
  { label: "Reading", value: "reading" },
  { label: "Read", value: "read" },
  { label: "Did Not Finish", value: "dnf" },
];

export default function AddToLibraryBtn({ bookId }) {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const userInfoContext = useContext(UserInfoContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusClick = async (selectedStatus) => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/library/${userInfoContext.userInfo.id}/${selectedStatus}`,
        {
          bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("library request went through");
    } catch (err) {
      console.log(err);
    }

    setAnchorEl(null);
  };

  //   useEffect(() => {
  //     const fetchDataAboutBook = async () => {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: process.env.REACT_APP_AUTH_AUDIENCE,
  //         scope: "read:current_user openid profile email phone",
  //       });

  //       try {
  //         const response = await axios.get(
  //           `${BACKEND_URL}/library/${userInfoContext.userInfo.id}/${selectedStatus}`,
  //           {
  //             bookId,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           }
  //         );
  //         console.log("library request went through");
  //       } catch (err) {
  //         console.log(err);
  //       }

  //     };

  //   }, []);

  return (
    <>
      <Button variant="contained" startIcon={<Add />} onClick={handleClick}>
        Add To Library
      </Button>

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
          <MenuItem
            key={option.value}
            onClick={() => handleStatusClick(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
