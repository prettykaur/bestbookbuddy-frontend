import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "../../../common/ui/ReviewCard";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../../../data/constants";
import { useParams } from "react-router-dom";

function ProfileReviews() {
  const [reviewsData, setReviewsData] = useState([]);
  const [updateData, setUpdateData] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    const fetchReviewsData = async () => {
      const response = await axios.get(`${BACKEND_URL}/reviews/user/${userId}`);

      setReviewsData(response.data);
    };

    fetchReviewsData();
  }, [updateData]);

  const updateProfileReviewsData = () =>
    setUpdateData((prevState) => !prevState);

  return (
    <>
      <Stack spacing={2}>
        {/* <pre>{JSON.stringify(reviewsData, null, 2)}</pre> */}
        <Typography variant="caption">
          {reviewsData.length === 0
            ? "No reviews yet"
            : reviewsData.length === 1
            ? `1 review`
            : `${reviewsData.length} reviews`}
        </Typography>
        {reviewsData.map((review) => (
          <ReviewCard
            key={review.id}
            reviewInfo={review}
            showBookInfo={true}
            updateData={updateProfileReviewsData}
          />
        ))}
      </Stack>
      <Typography variant="overline">End of reviews</Typography>
    </>
  );
}

export default ProfileReviews;

//reviewInfo, showBookInfo = false, updateData
