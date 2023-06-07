import React, { createContext, useState } from "react";

export const UserInfoContext = createContext();

function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState("hello");

  const context = {
    userInfo,
    setUserInfo,
  };

  return (
    <UserInfoContext.Provider value={context}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoProvider;
