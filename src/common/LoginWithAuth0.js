import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginWithAuth0Button = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="contained"
      onClick={() => {
        loginWithRedirect();
        console.log("Called");
      }}
    >
      Log In
    </Button>
  );
};

export default LoginWithAuth0Button;
