import { Stack, Typography } from "@mui/material";
import React from "react";
import LoginWithAuth0Button from "../../common/LoginWithAuth0";

function Logout() {
  return (
    <Stack>
      <Typography>You have logged out successfully.</Typography>
      <Typography>Log back in?</Typography>
      <LoginWithAuth0Button />
    </Stack>
  );
}

export default Logout;
