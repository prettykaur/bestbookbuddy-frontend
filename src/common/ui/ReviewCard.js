import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import React, { useState } from "react";
import LibraryCard from "./LibraryCard";
import {
  ArrowDropDownRounded,
  ArrowDropUpRounded,
  Delete,
  Edit,
} from "@mui/icons-material";
import ReviewLikesBtn from "./ReviewLikesBtn";
import AddReviewDialog from "../../pages/Book/BookReviews/ReviewsDialog/AddReviewDialog";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../../data/constants";

function ReviewCard({ reviewInfo, showBookInfo = false, updateData }) {
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  let text = reviewInfo?.body;

  const closeDialog = () => setOpenDialog(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.delete(
      `${BACKEND_URL}/reviews/${reviewInfo?.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          userId: reviewInfo?.user?.id,
        },
      }
    );

    updateData();
    setOpenDeleteDialog(false);
  };

  return (
    <Paper>
      <Stack py={4} px={3} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
        {showBookInfo && (
          <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
            <LibraryCard bookInfo={reviewInfo?.book} />
          </Stack>
        )}
        <Box flex={4}>
          <Stack spacing={3}>
            <Stack
              alignItems={"center"}
              sx={{ alignItems: { xs: "center", sm: "flex-start" } }}
            >
              <Typography variant="h5">{reviewInfo?.title}</Typography>
              <Rating value={reviewInfo?.rating} readOnly />
              <Stack direction={"row"} alignItems={"center"} spacing={1} mt={1}>
                <Avatar
                  alt={reviewInfo?.user?.username}
                  src={reviewInfo?.user?.photoUrl}
                  sx={{ width: 30, height: 30 }}
                />
                <Stack>
                  <Typography variant="caption" fontWeight={700}>
                    @{reviewInfo?.user?.username}
                  </Typography>
                  <Typography variant="caption">
                    Posted on{" "}
                    {new Date(reviewInfo?.createdAt).toLocaleDateString(
                      "en-SG"
                    )}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack>
              <Typography>
                {text.length < 250
                  ? text
                  : isShowingMore
                  ? text
                  : text.substring(0, 250) + `...`}
              </Typography>

              <Stack alignItems={"center"}>
                {text.length > 250 && (
                  <Button
                    disableRipple
                    sx={{ width: "fit-content" }}
                    onClick={() => setIsShowingMore(!isShowingMore)}
                    endIcon={
                      isShowingMore ? (
                        <ArrowDropUpRounded />
                      ) : (
                        <ArrowDropDownRounded />
                      )
                    }
                  >
                    {isShowingMore ? "Show Less" : "Show More"}
                  </Button>
                )}
              </Stack>

              <ReviewLikesBtn reviewId={reviewInfo.id} />
              {isAuthenticated && reviewInfo?.user?.email === user.email && (
                <Stack
                  direction={"row"}
                  spacing={1}
                  justifyContent={"flex-end"}
                >
                  <Button onClick={() => setOpenDialog(true)}>Edit</Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpenDeleteDialog(true)}
                  >
                    Delete
                  </Button>
                </Stack>
              )}
              <AddReviewDialog
                open={openDialog}
                closeDialog={closeDialog}
                updateData={updateData}
                bookId={reviewInfo?.book?.id}
                editMode={true}
                reviewInfo={reviewInfo}
              />

              <Dialog fullWidth maxWidth="md" open={openDeleteDialog}>
                <DialogTitle>Confirm delete?</DialogTitle>
                <DialogContent>
                  <Typography>This action cannot be undone.</Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenDeleteDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleDelete}>Confirm</Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

export default ReviewCard;
