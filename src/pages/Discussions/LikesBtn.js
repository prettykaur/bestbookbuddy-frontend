import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../data/constants";
import { useParams } from "react-router-dom";
import { IconButton, Stack, Typography } from "@mui/material";
import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { UserInfoContext } from "../../contexts/UserInfoProvider";

function LikesBtn() {
  const [usersList, setUsersList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { discussionId } = useParams();

  const userInfoContext = useContext(UserInfoContext);

  useEffect(() => {
    const fetchLikedData = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/discussions/${discussionId}/likes`
      );

      setUsersList(response.data);

      const user = response.data.find(
        (user) => user.id === userInfoContext?.userInfo?.id
      );
      if (user) setIsLiked(true);
      else setIsLiked(false);
    };

    fetchLikedData();
  }, [userInfoContext?.userInfo, updateData]);

  const handleLike = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    if (isLiked === true) {
      const response = await axios.delete(
        `${BACKEND_URL}/discussions/${discussionId}/unlike`,
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
        `${BACKEND_URL}/discussions/${discussionId}/like`,
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
    <Stack direction={"row"} alignItems={"center"}>
      {/* <pre>{JSON.stringify(usersList, null, 2)}</pre> */}
      <IconButton color="primary" onClick={handleLike}>
        {isLiked ? (
          <ThumbUp fontSize="small" color="info" />
        ) : (
          <ThumbUpOutlined fontSize="small" />
        )}
      </IconButton>
      <Typography>{usersList.length}</Typography>
    </Stack>
  );
}

export default LikesBtn;
