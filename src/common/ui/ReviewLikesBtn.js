import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../data/constants";
import { UserInfoContext } from "../../contexts/UserInfoProvider";
import { useAuth0 } from "@auth0/auth0-react";

function ReviewLikesBtn({ reviewId }) {
  const [count, setCount] = useState(0);
  const [usersLikesList, setUsersLikesList] = useState([]);
  const [status, setStatus] = useState("");
  const [updateData, setUpdateData] = useState(false);

  const userInfoContext = useContext(UserInfoContext);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/reviews/${reviewId}/likes/count`
      );

      setCount(response.data.count);
    };
    fetchLikes();
  }, [updateData]);

  useEffect(() => {
    const fetchLikesList = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/reviews/${reviewId}/likes`
      );

      setUsersLikesList(response.data);

      const user = response.data.find(
        (user) => user.id === userInfoContext?.userInfo?.id
      );
      console.log(user);
      if (user != null) setStatus("liked");
      else setStatus("");
    };

    fetchLikesList();
  }, [updateData, userInfoContext?.userInfo]);

  const handleLike = async () => {
    // if (userInfoContext?.userInfo?.id)
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    if (status === "liked") {
      const response = await axios.delete(
        `${BACKEND_URL}/reviews/${reviewId}/unlike`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            userId: userInfoContext?.userInfo?.id,
          },
        }
      );
    } else {
      const response = await axios.post(
        `${BACKEND_URL}/reviews/${reviewId}/like`,
        {
          userId: userInfoContext?.userInfo?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }

    setUpdateData((prevState) => !prevState);
  };

  return (
    <Stack direction={"row"} alignItems={"center"} mt={2}>
      {/* <pre>{JSON.stringify(usersLikesList, null, 2)}</pre> */}
      <IconButton type="button" onClick={handleLike}>
        {status === "liked" ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
      {count === 0 && (
        <Typography variant="subtitle2">
          This post hasn't been liked yet.
        </Typography>
      )}
      {count === 1 && (
        <Typography variant="subtitle2">
          1 person found this review helpful.
        </Typography>
      )}
      {count > 1 && (
        <Typography variant="subtitle2">
          {count} people found this review helpful.
        </Typography>
      )}
    </Stack>
  );
}

export default ReviewLikesBtn;
