import {
  Avatar,
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import React, { useState } from "react";
import LibraryCard from "./LibraryCard";
import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";

function ReviewCard() {
  const [isShowingMore, setIsShowingMore] = useState(false);

  let text = `I had serious problems with the way this book is written. Though Grandin's plainspoken writing style is refreshing, I often felt like she was oversimplifying very complex ideas in order to appeal to a scientifically illiterate audience (or worse, to make her arguments more convincing). Statements such as "Autism is a kind of way station on the road from animals to humans" aren't just over-dramatic (and ultimately nonsensical), they're also potentially offensive. Much of the book is purely speculative, and I'm left wondering whether it's really appropriate to write a popular science book that's mostly about completely untested hypotheses (this seems to be a growing trend in popular science literature, but that's another discussion entirely).`;

  return (
    <Paper>
      <Stack py={4} px={3} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
        <Box flex={1}>
          <LibraryCard />
        </Box>
        <Box flex={4}>
          <Stack spacing={3}>
            <Stack
              alignItems={"center"}
              sx={{ alignItems: { xs: "center", sm: "flex-start" } }}
            >
              <Typography variant="h5">Amazing read!</Typography>
              <Rating value="4" readOnly />
              <Stack direction={"row"} alignItems={"center"} spacing={1} mt={1}>
                <Avatar alt="syafiq" src="" sx={{ width: 30, height: 30 }} />
                <Typography variant="caption">Syafiq</Typography>
              </Stack>
            </Stack>
            <Stack>
              <Typography>
                {text.length < 250
                  ? text
                  : isShowingMore
                  ? text
                  : text.substring(0, 250) + `...`}
              </Typography>

              <Stack alignItems={"center"}>
                {text.length > 250 && (
                  <Button
                    disableRipple
                    sx={{ width: "fit-content" }}
                    onClick={() => setIsShowingMore(!isShowingMore)}
                    endIcon={
                      isShowingMore ? (
                        <ArrowDropUpRounded />
                      ) : (
                        <ArrowDropDownRounded />
                      )
                    }
                  >
                    {isShowingMore ? "Show Less" : "Show More"}
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

export default ReviewCard;
