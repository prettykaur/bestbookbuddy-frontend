import { Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../data/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { UserInfoContext } from "../../contexts/UserInfoProvider";

function Feed() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const userInfoContext = useContext(UserInfoContext);
  console.log(userInfoContext);

  return (
    <Stack>
      <Typography>This is the feed page</Typography>
      <Typography>AKA redirect page</Typography>
      <Typography>
        Will check if user exists in the db when they reach this page
      </Typography>
      <pre>{JSON.stringify(userInfoContext?.userInfo?.id ?? "Not ready")}</pre>
    </Stack>
  );
}

export default Feed;
