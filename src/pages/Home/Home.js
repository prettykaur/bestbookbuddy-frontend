import {
  Box,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LoginWithAuth0Button from "../../common/LoginWithAuth0";
import { Search } from "@mui/icons-material";

function Home() {
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
