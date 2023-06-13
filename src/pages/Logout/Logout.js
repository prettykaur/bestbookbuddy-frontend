import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import LoginWithAuth0Button from "../../common/LoginWithAuth0";
import BookPlaceholder from "../../common/ui/BookPlaceholder";

function Logout() {
  return (
    <Box flex={1}>
      <Container maxWidth="xl">
        <Stack my={5} spacing={1}>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <BookPlaceholder
              width={"200px"}
              height={"200px"}
              rounded={true}
              gradient={true}
            />
            <Typography variant="h4">We hate to see you leave...</Typography>
            <Typography>
              But we love to watch you go... *winky winky*
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Logout;
