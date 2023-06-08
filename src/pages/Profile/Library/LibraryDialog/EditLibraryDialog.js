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
    >
      <DialogTitle id="responsive-dialog-title">Edit Library</DialogTitle>
      <DialogContent>
        <Stack spacing={1} p={1} sx={{ overflowY: "scroll" }}>
          {wtrB.length !== 0 && (
            <Typography variant="h6" color={"primary"}>
              Want To Read
            </Typography>
          )}
          {wtrB.map((book) => (
            <BookCard key={book?.bookId} bookInfo={book?.book} />
          ))}

          {readingB.length !== 0 && (
            <Typography variant="h6" color={"primary"}>
              Want To Read
            </Typography>
          )}
          {readingB.map((book) => (
            <BookCard key={book?.bookId} bookInfo={book?.book} />
          ))}

          {readB.length !== 0 && (
            <Typography variant="h6" color={"primary"}>
              Want To Read
            </Typography>
          )}
          {readB.map((book) => (
            <BookCard key={book?.bookId} bookInfo={book?.book} />
          ))}

          {dnfB.length !== 0 && (
            <Typography variant="h6" color={"primary"}>
              Want To Read
            </Typography>
          )}
          {dnfB.map((book) => (
            <BookCard key={book?.bookId} bookInfo={book?.book} />
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
