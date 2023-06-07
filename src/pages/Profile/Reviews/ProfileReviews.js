import React from "react";
import ReviewCard from "../../../common/ui/ReviewCard";
import { Stack, Typography } from "@mui/material";

function ProfileReviews() {
  return (
    <>
      <Stack>
        <Typography>11 reviews</Typography>
        <ReviewCard />
      </Stack>
      <Typography variant="overline">End of reviews</Typography>
    </>
  );
}

export default ProfileReviews;
