import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../contexts/UserInfoProvider";
import axios from "axios";
import { BACKEND_URL } from "../../data/constants";
import { Button } from "@mui/material";
import { PersonAddTwoTone } from "@mui/icons-material";

function AddFriendBtn({ userId }) {
  const { getAccessTokenSilently } = useAuth0();

  const userInfoContext = useContext(UserInfoContext);

  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      console.log(userInfoContext?.userInfo?.id);

      const response = await axios.get(
        `${BACKEND_URL}/friends/${userInfoContext?.userInfo?.id}/sent-requests`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setRequestsList(response.data);
    };

    fetchStatus();
  }, [userInfoContext?.userInfo, userId]);

  const handleAddFriend = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.post(
      `${BACKEND_URL}/friends/${userInfoContext?.userInfo?.id}/send-friend-request`,
      {
        recipientId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  let alreadySent = true;
  const status = requestsList.find(
    (request) => +request.recipientId === +userId
  );
  if (!status) alreadySent = false;

  return (
    <>
      <Button
        startIcon={<PersonAddTwoTone />}
        onClick={handleAddFriend}
        disabled={alreadySent ? true : false}
      >
        Add Friend
      </Button>
      {/* <pre>{JSON.stringify(friendsList, null, 2)}</pre> */}
    </>
  );
}

export default AddFriendBtn;
