import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../data/constants";
import { useParams } from "react-router-dom";
import AddDiscussionDialog from "./DiscussionsDialog/AddDiscussionDialog";
import DiscussionCard from "../../../common/ui/DiscussionCard";
import DiscussionTitleCard from "../../../common/ui/DiscussionTitleCard";
import { Add } from "@mui/icons-material";

function BookDiscussions() {
  const { bookId } = useParams();

  const [discussionsData, setDiscussionsData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  const updateDiscussionsData = () => setUpdateData((prevState) => !prevState);
  const closeDialog = () => setOpenDialog(false);

  useEffect(() => {
    const fetchDiscussionsData = async () => {
      const response = await axios.get(`${BACKEND_URL}/discussions/`);

      let arr = [];
      response.data.forEach((discussion) => {
        if (discussion.book.id === +bookId && discussion.parentId == null) {
          arr.push(discussion);
        }
      });

      setDiscussionsData(arr);
    };

    fetchDiscussionsData();
  }, [updateData]);

  return (
    <Stack>
      <Stack
        sx={{
          alignItems: { md: "flex-start" },
        }}
      >
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Post a new discussion
        </Button>
      </Stack>

      <Typography variant="overline">
        {discussionsData.length === 0
          ? "No discussions yet. :-("
          : `${discussionsData.length} discussions`}
      </Typography>
      {discussionsData.map((discussion) => (
        <DiscussionTitleCard
          key={discussion.id}
          discussionInfo={discussion}
          bookInfo={discussion.book}
          userInfo={discussion.user}
        />
      ))}
      {discussionsData.length !== 0 && (
        <Typography variant="overline">End of discussions</Typography>
      )}

      <AddDiscussionDialog
        open={openDialog}
        closeDialog={closeDialog}
        updateData={updateDiscussionsData}
      />
    </Stack>
  );
}

export default BookDiscussions;
