import { Box, Container, Stack, Typography } from "@mui/material";
import groupPhoto from "../../assets/images/LOL.png";

import React from "react";

function Marketplace() {
  return (
    <Box flex={1}>
      <Container maxWidth="xl">
        <Stack
          my={5}
          spacing={1}
          justifyContent={"center"}
          alignContent={"center"}
          textAlign={"center"}
        >
          <Typography variant="h4">Work in Progress!</Typography>

          <Typography color="primary">
            Please visit{" "}
            <b>
              <u>BENDAN E-commerce Pte Ltd</u>
            </b>{" "}
            for your book buying needs. :-)
          </Typography>

          <img alt="group selfie" src={groupPhoto} />

          <Typography variant="h5">Joint Partnership 2023 🎉🎊</Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Marketplace;
