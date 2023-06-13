import {
  Avatar,
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../data/constants";
import axios from "axios";
import LibraryCard from "../../../common/ui/LibraryCard";
import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";
import ReviewLikesBtn from "../../../common/ui/ReviewLikesBtn";

export default function LikedReview({
  bookId,
  userInfo,
  dateInfo,
  reviewInfo,
}) {
  const [bookData, setBookData] = useState();
  const [isShowingMore, setIsShowingMore] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await axios.get(`${BACKEND_URL}/books/${bookId}`);
      setBookData(response.data);
    };

    fetchBookData();
  }, []);

  let text = reviewInfo?.body;

  return (
    <Paper>
      <Stack p={2} spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Avatar alt={userInfo?.username} src={userInfo?.photoUrl} />
          <Stack>
            <Typography>
              <b>@{userInfo?.username}</b> found a review for a book to be
              helpful.
            </Typography>
            <Typography variant="caption">
              {new Date(dateInfo).toLocaleString("en-SG")}
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <LibraryCard bookInfo={bookData} />
        </Stack>
        <Paper elevation={3}>
          <Stack p={2} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
            <Box flex={4}>
              <Stack spacing={3}>
                <Stack
                  alignItems={"center"}
                  sx={{ alignItems: { xs: "center", sm: "flex-start" } }}
                >
                  <Typography variant="h5">{reviewInfo?.title}</Typography>
                  <Rating value={reviewInfo?.rating} readOnly />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    mt={1}
                  >
                    <Avatar
                      alt={userInfo?.username}
                      src={userInfo?.photoUrl}
                      sx={{ width: 30, height: 30 }}
                    />
                    <Stack>
                      <Typography variant="caption" fontWeight={700}>
                        @{userInfo?.username}
                      </Typography>
                      <Typography variant="caption">
                        Posted on{" "}
                        {new Date(reviewInfo?.createdAt).toLocaleDateString(
                          "en-SG"
                        )}
                      </Typography>
                    </Stack>
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
                  <ReviewLikesBtn reviewId={reviewInfo?.id} />
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
      </Stack>
    </Paper>
  );
}
