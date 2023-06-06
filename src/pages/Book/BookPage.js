import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookPlaceholder from "../../common/ui/BookPlaceholder";
import BasicTabs from "./Tabs/BasicTabs";

function BookPage() {
  const [bookInfo, setBookInfo] = useState({});

  useEffect(() => {}, []);

  return (
    <Box>
      <Container maxWidth="xl">
        <Stack my={5}>
          <Paper>
            <Stack direction={"row"} spacing={1} p={2}>
              <BookPlaceholder width={"71px"} height={"110px"} />
              <Stack>
                <Typography variant="h5">Title</Typography>
                <Typography variant="body1">Author</Typography>
              </Stack>
            </Stack>
          </Paper>
          <BasicTabs />
        </Stack>
      </Container>
    </Box>
  );
}

export default BookPage;
