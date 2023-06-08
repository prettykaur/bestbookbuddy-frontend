import {
  Box,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import LoginWithAuth0Button from "../../common/LoginWithAuth0";
import { Search } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("logged in");
      navigate("/feed");
    }
  }, [isAuthenticated]);

  return (
    <Stack flex={1}>
      <Container maxWidth="xl">
        <Stack alignItems={"center"} textAlign={"center"}>
          <Typography variant="h2" sx={{ py: 5 }}>
            Your amazing adventure begins here.
          </Typography>

          <Typography variant="h4">Login or Sign Up</Typography>
          <Typography variant="body1" sx={{ pb: 2 }}>
            You will be redirected to our authentication provider.
          </Typography>
          <LoginWithAuth0Button />

          <Typography variant="h4" sx={{ pt: 5, pb: 2 }}>
            Or search for something
          </Typography>
          <TextField
            sx={{ width: "80%" }}
            placeholder="Search for a book, author, etc"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Container>
    </Stack>
  );
}

export default Home;
