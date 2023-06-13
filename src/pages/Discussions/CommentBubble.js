import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BACKEND_URL } from "../../data/constants";
import { UserInfoContext } from "../../contexts/UserInfoProvider";

function CommentBubble({ commentInfo, userInfo, parentInfo, updateData }) {
  const [editMode, setEditMode] = useState(false);
  const [newBody, setNewBody] = useState(commentInfo?.body);

  const { getAccessTokenSilently } = useAuth0();

  const userInfoContext = useContext(UserInfoContext);

  const handleChange = (e) => {
    setNewBody(e.target.value);
  };

  const handleEdit = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.put(
      `${BACKEND_URL}/discussions/${parentInfo}/${commentInfo?.id}`,
      {
        userId: userInfoContext?.userInfo?.id,
        body: newBody,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    updateData();
    setEditMode(false);
  };

  const handleDelete = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.delete(
      `${BACKEND_URL}/discussions/${parentInfo}/${commentInfo?.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          userId: userInfoContext?.userInfo?.id,
        },
      }
    );

    updateData();
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
              {new Date(commentInfo?.createdAt).toLocaleString("en-SG")}
            </Typography>
          </Stack>
        </Stack>

        {editMode ? (
          <Stack>
            <TextField
              required
              fullWidth
              name="content"
              placeholder="What are you thinking?"
              value={newBody}
              onChange={handleChange}
              multiline
              maxRows={4}
            />
            <Stack direction={"row"} justifyContent={"center"}>
              <Button onClick={handleEdit}>Submit</Button>
              <Button onClick={() => setEditMode(false)}>Back</Button>
            </Stack>
          </Stack>
        ) : (
          <Typography>{commentInfo?.body}</Typography>
        )}

        {userInfoContext?.userInfo.id === userInfo?.id && !editMode && (
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

export default CommentBubble;
