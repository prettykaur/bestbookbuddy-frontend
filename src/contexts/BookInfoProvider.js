import React, { createContext, useState } from "react";

export const BookInfoContext = createContext();

function BookInfoProvider({ children }) {
  const [CONTEXT_bookInfo, setCONTEXT_bookInfo] = useState(null);
  const [OL_bookInfo, setOL_bookInfo] = useState(null);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [GOOGLE_bookInfo, setGOOGLE_bookInfo] = useState(null);

  const obj = {
    CONTEXT_bookInfo,
    setCONTEXT_bookInfo,
    OL_bookInfo,
    setOL_bookInfo,
    authorInfo,
    setAuthorInfo,
    GOOGLE_bookInfo,
    setGOOGLE_bookInfo,
  };

  return (
    <BookInfoContext.Provider value={obj}>{children}</BookInfoContext.Provider>
  );
}

export default BookInfoProvider;
