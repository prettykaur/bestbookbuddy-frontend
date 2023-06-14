import React, { useEffect, useState } from "react";
import { Avatar, Paper, Stack, Typography } from "@mui/material";
import {
  QuestionAnswerOutlined,
  QuestionAnswerRounded,
  ThumbUpOutlined,
  ThumbUpRounded,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../data/constants";

function DiscussionTitleCard({
  discussionInfo,
  NONPARAM_bookId = null,
  userInfo,
}) {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    const fetchNumbers = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/discussions/${discussionInfo?.id}/likes/count`
      );
      setLikesCount(response.data.likesCount);

      const response2 = await axios.get(
        `${BACKEND_URL}/discussions/${discussionInfo?.id}`
      );
      setCommentsCount(response2.data.children.length);
    };

    fetchNumbers();
  }, []);

  return (
    <Paper
      onClick={() =>
        navigate(
          `/book/${bookId || NONPARAM_bookId}/discussions/${discussionInfo?.id}`
        )
      }
    >
      <Stack p={2} spacing={0.5}>
        <Typography variant="h5">{discussionInfo?.title}</Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Avatar
            alt={userInfo?.username}
            src={userInfo?.photoUrl}
            sx={{ width: 17, height: 17 }}
          />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            @{userInfo?.username}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="caption">
            Posted on{" "}
            {new Date(discussionInfo?.createdAt).toLocaleDateString("en-SG")}
          </Typography>
          <Stack direction={"row"} spacing={1}>
            <Stack direction={"row"} spacing={0.5}>
              <ThumbUpOutlined fontSize="small" color="primary" />
              <Typography>{likesCount}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={0.5}>
              <QuestionAnswerOutlined fontSize="small" color="primary" />
              <Typography>{commentsCount}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default DiscussionTitleCard;
