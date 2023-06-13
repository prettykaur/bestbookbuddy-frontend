import { QuestionAnswerOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import LikesBtn from "../../pages/Discussions/LikesBtn";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../../data/constants";
import { UserInfoContext } from "../../contexts/UserInfoProvider";
import FormInputField from "./FormInputField";

function DiscussionCard({ discussionInfo, bookInfo, userInfo, updateData }) {
  const { bookId, discussionId } = useParams();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [replyMode, setReplyMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [content, setContent] = useState("");

  const userInfoContext = useContext(UserInfoContext);

  const [title, setTitle] = useState(discussionInfo?.title);

  const [body, setBody] = useState(discussionInfo?.body);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.post(
      `${BACKEND_URL}/discussions/${bookId}/${discussionId}`,
      {
        userId: userInfoContext?.userInfo?.id,
        body: content,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    updateData();
    setContent("");
    setReplyMode(false);
  };

  const handleEdit = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.put(
      `${BACKEND_URL}/discussions/${discussionInfo?.id}`,
      {
        userId: userInfoContext?.userInfo?.id,
        title,
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    updateData();
    setTitle("");
    setBody("");
    setEditMode(false);
  };

  const handleDelete = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.delete(
      `${BACKEND_URL}/discussions/${discussionInfo?.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          userId: userInfoContext?.userInfo?.id,
        },
      }
    );
  };

  return (
    <Paper>
      <Stack p={2} spacing={2}>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Avatar
            alt={userInfo?.username}
            src={userInfo?.photoUrl}
            sx={{ width: 30, height: 30 }}
          />
          <Stack>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              @{userInfo?.username}
            </Typography>
            <Typography variant="caption">
              Posted on{" "}
              {new Date(discussionInfo?.createdAt).toLocaleString("en-SG")}
            </Typography>
          </Stack>
        </Stack>

        {editMode ? (
          <>
            <FormInputField
              label={"Title"}
              name={"title"}
              value={title}
              onChange={handleTitleChange}
            />
            <TextField
              required
              name="body"
              placeholder="What is on your mind, my dude?"
              variant="outlined"
              size="small"
              value={body}
              onChange={handleBodyChange}
              multiline
              rows={4}
            />
            <Stack direction={"row"} justifyContent={"center"}>
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
              <Button onClick={handleEdit}>Submit</Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h5">{discussionInfo?.title}</Typography>
            <Typography>{discussionInfo?.body}</Typography>

            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <LikesBtn />
                <Button
                  startIcon={<QuestionAnswerOutlined fontSize="small" />}
                  onClick={() => setReplyMode((prevState) => !prevState)}
                >
                  Reply
                </Button>
              </Stack>

              {userInfoContext?.userInfo?.id === userInfo?.id && (
                <Stack direction={"row"}>
                  <Button onClick={() => setEditMode(true)}>Edit</Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Stack>
              )}
            </Stack>
          </>
        )}

        {replyMode && (
          <Stack justifyContent={"flex-start"}>
            <TextField
              required
              fullWidth
              name="content"
              placeholder="What are you thinking?"
              value={content}
              onChange={handleChange}
              multiline
              maxRows={4}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

export default DiscussionCard;
