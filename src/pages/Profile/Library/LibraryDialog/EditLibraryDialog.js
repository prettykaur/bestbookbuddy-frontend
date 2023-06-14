import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import BookCard from "./BookCard";

export default function EditLibraryDialog({
  open,
  setOpenDialog,
  wtrB,
  readingB,
  readB,
  dnfB,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();

  const closeDialog = () => setOpenDialog(false);

  //   useEffect(() => {
  //     const checkOrCreateUser = async () => {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: process.env.REACT_APP_AUTH_AUDIENCE,
  //         scope: "read:current_user openid profile email phone",
  //       });

  //       console.log(user.nickname);
  //       console.log(user.email);
  //       console.log(user.picture);

  //       try {
  //         const response = await axios.post(
  //           `${BACKEND_URL}/users`,
  //           {
  //             username: user.nickname,
  //             email: user.email,
  //             photoUrl: user.picture,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           }
  //         );
  //         console.log("user request went through");
  //         console.log(userInfoContext);

  //         userInfoContext.setUserInfo(response.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };

  //     if (isAuthenticated) {
  //       checkOrCreateUser();
  //     }
  //   }, [isAuthenticated]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      //   onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      scroll="paper"
    >
      <DialogTitle id="responsive-dialog-title">Edit Library</DialogTitle>
      <DialogContent>
        {wtrB.length === 0 &&
          readingB.length === 0 &&
          readB.length === 0 &&
          dnfB.length === 0 && <Typography>No library data found!</Typography>}
        <Stack spacing={1} p={1}>
          {wtrB.length !== 0 && (
            <Typography variant="h6" color={"primary"}>
              Want To Read
            </Typography>
          )}
          {wtrB.map((book) => (
            <BookCard
              key={book?.id}
              bookInfo={book}
              closeDialog={closeDialog}
            />
          ))}

          {readingB.length !== 0 && (
            <Typography variant="h6" color={"primary"}>
              Reading
            </Typography>
          )}
          {readingB.map((book) => (
            <BookCard
              key={book?.id}
              bookInfo={book}
              closeDialog={closeDialog}
            />
          ))}

          {readB.length !== 0 && (
            <Typography variant="h6" color={"primary"}>
              Read
            </Typography>
          )}
          {readB.map((book) => (
            <BookCard
              key={book?.id}
              bookInfo={book}
              closeDialog={closeDialog}
            />
          ))}

          {dnfB.length !== 0 && (
            <Typography variant="h6" color={"primary"}>
              Did Not Finish
            </Typography>
          )}
          {dnfB.map((book) => (
            <BookCard
              key={book?.id}
              bookInfo={book}
              closeDialog={closeDialog}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpenDialog(false)}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
