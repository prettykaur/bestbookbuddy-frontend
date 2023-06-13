import { Avatar, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../data/constants";
import axios from "axios";
import CollectionsCard from "../../Profile/Collections/CollectionsCard";

export default function CreatedCollection({
  userInfo,
  dateInfo,
  collectionInfo,
}) {
  const [collectionData, setCollectionData] = useState();

  useEffect(() => {
    const fetchCollectionData = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/collections/${userInfo?.id}/${collectionInfo?.id}`
      );
      setCollectionData(response.data);
      console.log(response.data);
    };

    fetchCollectionData();
  }, []);

  return (
    <Paper>
      <Stack p={2} spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Avatar alt={userInfo?.username} src={userInfo?.photoUrl} />
          <Stack>
            <Typography>
              <b>@{userInfo?.username}</b> has created a new collection.
            </Typography>
            <Typography variant="caption">
              {new Date(dateInfo).toLocaleString("en-SG")}
            </Typography>
          </Stack>
        </Stack>

        {collectionData != null && (
          <CollectionsCard
            key={collectionInfo.id}
            name={collectionInfo.name}
            description={collectionInfo.description}
            booksArr={collectionData.books}
          />
        )}
      </Stack>
    </Paper>
  );
}
