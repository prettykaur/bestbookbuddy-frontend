import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../data/constants";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import DiscussionCard from "../../common/ui/DiscussionCard";
import CommentBubble from "./CommentBubble";
import LibraryCard from "../../common/ui/LibraryCard";

function DiscussionsPage() {
  const { bookId, discussionId } = useParams();

  const [bookData, setBookData] = useState();
  const [discussionData, setDiscussionsData] = useState();
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchDiscussionData = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/discussions/${discussionId}`
      );
      setDiscussionsData(response.data);
    };

    fetchDiscussionData();
  }, [updateData]);

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await axios.get(`${BACKEND_URL}/books/${bookId}`);
      setBookData(response.data);
    };

    fetchBookData();
  }, [updateData]);

  const forceUpdate = () => setUpdateData((prevState) => !prevState);

  return (
    <Box flex={1}>
      <Container maxWidth="xl">
        <Stack my={5} spacing={3}>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <LibraryCard bookInfo={bookData} />
          </Stack>
          <DiscussionCard
            discussionInfo={discussionData}
            bookInfo={discussionData?.book}
            userInfo={discussionData?.user}
            updateData={forceUpdate}
          />
          <Typography variant="h5">
            Replies ({discussionData?.children?.length})
          </Typography>
          {discussionData?.children?.length === 0 ? (
            <Typography>No replies yet.</Typography>
          ) : (
            <Stack spacing={2}>
              {discussionData?.children
                ?.sort((a, b) => a.id - b.id)
                .map((comment) => (
                  <CommentBubble
                    key={comment.id}
                    parentInfo={discussionId}
                    commentInfo={comment}
                    userInfo={comment.user}
                    updateData={forceUpdate}
                  />
                ))}

              <Typography variant="overline">End of replies list</Typography>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default DiscussionsPage;
