import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../data/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { UserInfoContext } from "../../contexts/UserInfoProvider";
import CreateLibrary from "./FeedActivities/CreateLibrary";
import CreatedComment from "./FeedActivities/CreatedComment";
import CreatedReview from "./FeedActivities/CreatedReview";
import CreatedDiscussion from "./FeedActivities/CreatedDiscussion";
import CreatedCollection from "./FeedActivities/CreatedCollection";
import LikedDiscussion from "./FeedActivities/LikedDiscussion";
import LikedReview from "./FeedActivities/LikedReview";
import CreatedFriend from "./FeedActivities/CreatedFriend";

function Feed() {
  const { getAccessTokenSilently } = useAuth0();

  const userInfoContext = useContext(UserInfoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [feedData, setFeedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH_AUDIENCE,
          scope: "read:current_user openid profile email phone",
        });

        const response = await axios.get(
          `${BACKEND_URL}/feed/${userInfoContext?.userInfo?.id}?page=1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setFeedData(response.data);
        setCurrentPage((prevPage) => prevPage + 1);
      } catch (err) {
        if (err?.response?.data?.msg === "No activities found") setFeedData([]);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchFeedData();
  }, [userInfoContext?.userInfo]);

  const handleLoadMore = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.get(
      `${BACKEND_URL}/feed/${userInfoContext?.userInfo?.id}?page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setFeedData((prevResult) => [...prevResult, ...response.data]);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (isLoading)
    return (
      <>
        <CircularProgress />
        <Typography>Retrieving info...</Typography>
      </>
    );

  return (
    <Box flex={1}>
      <Container maxWidth="xl">
        <Stack my={5} spacing={3}>
          {/* <pre>{JSON.stringify(feedData, null, 2)}</pre> */}

          {feedData.map((activity) => {
            if (activity?.targetDetails?.error) return <></>;

            if (
              activity.activityType + activity.targetType ===
              "createdlibrary"
            )
              return (
                <CreateLibrary
                  key={activity?.id}
                  bookId={activity?.targetDetails?.bookId}
                  userInfo={activity?.user}
                  statusId={activity?.targetDetails?.statusId}
                  dateInfo={activity?.createdAt}
                />
              );

            if (
              activity.activityType + activity.targetType ===
              "createdcomment"
            )
              return (
                <CreatedComment
                  key={activity?.id}
                  dateInfo={activity?.createdAt}
                  bookId={activity?.targetDetails?.bookId}
                  userInfo={activity?.user}
                  commentInfo={activity.targetDetails}
                />
              );
            if (activity.activityType + activity.targetType === "createdreview")
              return (
                <CreatedReview
                  key={activity?.id}
                  bookId={activity?.targetDetails?.bookId}
                  userInfo={activity?.user}
                  dateInfo={activity?.createdAt}
                  reviewInfo={activity.targetDetails}
                />
              );
            if (
              activity.activityType + activity.targetType ===
              "createdcollection"
            )
              return (
                <CreatedCollection
                  key={activity?.id}
                  userInfo={activity?.user}
                  dateInfo={activity?.createdAt}
                  collectionInfo={activity.targetDetails}
                />
              );
            if (
              activity.activityType + activity.targetType ===
              "createddiscussion"
            )
              return (
                <CreatedDiscussion
                  key={activity?.id}
                  bookId={activity?.targetDetails?.bookId}
                  userInfo={activity?.user}
                  dateInfo={activity?.createdAt}
                  discussionInfo={activity.targetDetails}
                />
              );
            if (
              activity.activityType + activity.targetType ===
              "createdfriends"
            )
              return (
                <CreatedFriend
                  key={activity?.id}
                  dateInfo={activity?.createdAt}
                  userInfo={activity?.user}
                  otherUserInfo={activity?.targetDetails}
                />
              );
            if (activity.activityType + activity.targetType === "likedreview")
              return (
                <LikedReview
                  key={activity?.id}
                  bookId={activity?.targetDetails?.bookId}
                  userInfo={activity?.user}
                  dateInfo={activity?.createdAt}
                  reviewInfo={activity.targetDetails}
                />
              );
            if (
              activity.activityType + activity.targetType ===
              "likeddiscussion"
            )
              return (
                <LikedDiscussion
                  key={activity?.id}
                  bookId={activity?.targetDetails?.bookId}
                  userInfo={activity?.user}
                  dateInfo={activity?.createdAt}
                  discussionInfo={activity.targetDetails}
                />
              );

            return <></>;
          })}

          {feedData.length !== 0 && (
            <Button variant="contained" onClick={handleLoadMore}>
              Load More
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default Feed;
