import React, { useEffect, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfilePageTabs() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  const { userId } = useParams();

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith("/library")) {
      setValue(1);
    } else if (path.endsWith("/collections")) {
      setValue(2);
    } else if (path.endsWith("/reviews")) {
      setValue(3);
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Info"
            {...a11yProps(0)}
            onClick={() => navigate(`/user/${userId}`)}
          />
          <Tab
            label="Library"
            {...a11yProps(1)}
            onClick={() => navigate(`/user/${userId}/library`)}
          />
          <Tab
            label="Collections"
            {...a11yProps(2)}
            onClick={() => navigate(`/user/${userId}/collections`)}
          />
          <Tab
            label="Reviews"
            {...a11yProps(3)}
            onClick={() => navigate(`/user/${userId}/reviews`)}
          />
        </Tabs>
      </Box>
      <Box sx={{ py: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
