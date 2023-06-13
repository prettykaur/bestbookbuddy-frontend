import { useAuth0 } from "@auth0/auth0-react";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../../contexts/UserInfoProvider";
import { BACKEND_URL } from "../../../data/constants";
import CollectionsActionBar from "./CollectionsActions/CollectionsActionBar";
import CollectionsCard from "./CollectionsCard";
import { useParams } from "react-router-dom";

export const CollectionsContext = createContext();

function ProfileCollections() {
  const [collectionsInfo, setCollectionsInfo] = useState([]);
  const [updateData, setUpdateData] = useState(false);

  const context = {
    collectionsInfo,
    setCollectionsInfo,
    updateData,
    setUpdateData,
  };

  const { userId } = useParams();

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const userInfoContext = useContext(UserInfoContext);

  useEffect(() => {
    const fetchCollectionsData = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      const response = await axios.get(`${BACKEND_URL}/collections/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setCollectionsInfo(response.data);
      console.log(collectionsInfo);
    };

    if (isAuthenticated) {
      fetchCollectionsData();
    }
  }, [isAuthenticated, updateData]);

  return (
    <CollectionsContext.Provider value={context}>
      {userInfoContext?.userInfo?.id === userId && <CollectionsActionBar />}

      <Stack spacing={4}>
        {collectionsInfo.map((collection) => (
          <CollectionsCard
            key={collection.id}
            name={collection.name}
            description={collection.description}
            booksArr={collection.books}
          />
        ))}
      </Stack>
      <Typography variant="overline">End of collections</Typography>
    </CollectionsContext.Provider>
  );
}

export default ProfileCollections;
