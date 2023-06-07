import { Stack, Typography } from "@mui/material";
import React from "react";
import CollectionsCard from "./CollectionsCard";

function ProfileCollections() {
  return (
    <>
      <Stack spacing={4}>
        <CollectionsCard />
        <CollectionsCard />
      </Stack>
      <Typography variant="overline">End of collections</Typography>
    </>
  );
}

export default ProfileCollections;
