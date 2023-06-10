import { CircularProgress, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { useNavigate } from "react-router-dom";
import BookPlaceholder from "./BookPlaceholder";

function LibraryCard({ bookInfo }) {
  console.log(bookInfo);

  const navigate = useNavigate();

  return (
    <Stack
      p={2}
      spacing={1}
      textAlign={"center"}
      className="light-grey-hover"
      alignItems={"center"}
      justifyContent={"center"}
      width={"150px"}
      onClick={() => navigate(`/book/${bookInfo?.id}`)}
    >
      {bookInfo?.olCoverId ? (
        <Image
          alt="book cover"
          src={`https://covers.openlibrary.org/b/id/${bookInfo?.olCoverId}-M.jpg`}
          width={"80px"}
          height={"112px"}
          style={{ objectFit: "contain" }}
          showLoading={<CircularProgress />}
        />
      ) : (
        <BookPlaceholder width={80} height={112} />
      )}

      <Stack>
        <Typography variant="caption" sx={{ fontWeight: 700, lineHeight: 1 }}>
          {bookInfo?.title}
        </Typography>
        <Typography variant="caption">
          {bookInfo?.authorName?.split(",")[0] ||
            bookInfo?.author?.split(",")[0]}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default LibraryCard;
