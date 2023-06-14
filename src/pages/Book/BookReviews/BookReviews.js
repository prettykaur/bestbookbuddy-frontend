import { Button, Paper, Rating, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../../data/constants";
import { BookInfoContext } from "../../../contexts/BookInfoProvider";
import ReviewCard from "../../../common/ui/ReviewCard";
import { Add, Edit } from "@mui/icons-material";
import AddReviewDialog from "./ReviewsDialog/AddReviewDialog";
import { UserInfoContext } from "../../../contexts/UserInfoProvider";

function BookReviews() {
  const bookInfoContext = useContext(BookInfoContext);
  const userInfoContext = useContext(UserInfoContext);

  const [reviewsData, setReviewsData] = useState([]);

  const [averageRating, setAverageRating] = useState(null);
  const [googleData, setGoogleData] = useState();
  const [updateData, setUpdateData] = useState(false);

  const [hasReviewedAlready, setHasReviewedAlready] = useState(false);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/reviews/${bookInfoContext.CONTEXT_bookInfo.id}`
        );

        setReviewsData(response.data);

        let averageRating = 0;
        response.data.forEach((review) => (averageRating += +review.rating));
        averageRating = averageRating / response.data.length;
        setAverageRating(averageRating);
      } catch (err) {
        setReviewsData([]);
      }
    };

    fetchReviewsData();
  }, [updateData]);

  useEffect(() => {
    const fetchGoogleReviewsData = async () => {
      const googleResponse = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=+isbn:${
          bookInfoContext.CONTEXT_bookInfo.isbn13 ||
          bookInfoContext.CONTEXT_bookInfo.isbn10
        }&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      );

      if (googleResponse.data.totalItems === 0) {
        setGoogleData(null);
        return;
      }

      setGoogleData(googleResponse.data.items[0]);
    };

    fetchGoogleReviewsData();
  }, []);

  useEffect(() => {
    const user = reviewsData?.find(
      (review) => review.user?.id === userInfoContext?.userInfo?.id
    );
    console.log(user);
    if (user) setHasReviewedAlready(true);
    else setHasReviewedAlready(false);
  }, [reviewsData, userInfoContext?.userInfo]);

  const updateReviewsData = () => setUpdateData((prevState) => !prevState);
  const closeAddDialog = () => setOpenAddDialog(false);

  return (
    <>
      <Stack spacing={3}>
        <Stack
          sx={{
            alignItems: { md: "flex-start" },
          }}
        >
          {hasReviewedAlready ? (
            <Button variant="contained" startIcon={<Edit />}>
              Edit Review
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenAddDialog(true)}
            >
              Add Review
            </Button>
          )}
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h4">REAL & LEGIT Reviews</Typography>
          <Paper>
            <Stack p={2} spacing={3}>
              <Stack>
                <Typography>OpenLibrary.org</Typography>
                {bookInfoContext?.CONTEXT_bookInfo?.olRatingsCount != null ? (
                  <>
                    <Stack direction={"row"} spacing={2}>
                      <Rating
                        value={
                          bookInfoContext?.CONTEXT_bookInfo?.olRatingsAverage
                        }
                        precision={0.1}
                        readOnly
                      />
                      <Typography variant="h5">
                        {bookInfoContext?.CONTEXT_bookInfo?.olRatingsAverage?.toFixed(
                          2
                        )}
                      </Typography>
                    </Stack>
                    <Typography variant="caption">
                      (based on{" "}
                      {bookInfoContext?.CONTEXT_bookInfo?.olRatingsCount}{" "}
                      ratings)
                    </Typography>
                  </>
                ) : (
                  <Typography variant="caption">
                    No ratings available. :-(
                  </Typography>
                )}
              </Stack>

              <Stack>
                <Typography>Google Books</Typography>
                {googleData?.volumeInfo?.ratingsCount != null ? (
                  <>
                    <Stack direction={"row"} spacing={2}>
                      <Rating
                        value={googleData?.volumeInfo?.averageRating}
                        precision={0.1}
                        readOnly
                      />
                      <Typography variant="h5">
                        {googleData?.volumeInfo?.averageRating?.toFixed(2)}
                      </Typography>
                    </Stack>
                    <Typography variant="caption">
                      (based on {googleData?.volumeInfo?.ratingsCount} ratings)
                    </Typography>
                  </>
                ) : (
                  <Typography variant="caption">
                    No ratings available :-(
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Paper>
        </Stack>

        <Stack>
          <Typography variant="h4">Community Reviews</Typography>
          {reviewsData.length !== 0 && (
            <Paper sx={{ padding: 2 }}>
              <Stack direction={"row"} spacing={2}>
                <Rating value={+averageRating} precision={0.1} readOnly />
                <Typography variant="h5">{averageRating.toFixed(2)}</Typography>
              </Stack>
              <Typography variant="caption">
                (based on {reviewsData.length} ratings)
              </Typography>
            </Paper>
          )}
          <Typography variant="overline">
            {reviewsData.length === 0
              ? "No reviews yet. Add one?"
              : reviewsData.length === 1
              ? "Showing 1 review"
              : `Showing ${reviewsData.length} reviews`}
          </Typography>
          {reviewsData.map((review) => (
            <ReviewCard
              key={review.id}
              reviewInfo={review}
              updateData={updateReviewsData}
            />
          ))}
          {reviewsData.length !== 0 && (
            <Typography variant="overline">End of Reviews</Typography>
          )}
        </Stack>
      </Stack>
      <AddReviewDialog
        open={openAddDialog}
        closeDialog={closeAddDialog}
        updateData={updateReviewsData}
        bookId={bookInfoContext?.CONTEXT_bookInfo?.id}
      />
    </>
  );
}

export default BookReviews;
