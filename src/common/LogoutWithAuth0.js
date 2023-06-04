import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AUTH_LOGOUT_REDIRECT_URL } from "../data/constants";
import { Button } from "@mui/material";

const LogoutWithAuth0Button = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="contained"
      onClick={() =>
        logout({ logoutParams: { returnTo: AUTH_LOGOUT_REDIRECT_URL } })
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutWithAuth0Button;
