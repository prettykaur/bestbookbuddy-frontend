import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookInfo from "../BookInfo/BookInfo";
import BookReviews from "../BookReviews/BookReviews";
import BookDiscussions from "../BookDiscussions/BookDiscussions";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  const { bookId } = useParams();

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith("/reviews")) {
      setValue(1);
    } else if (path.endsWith("/discussions")) {
      setValue(2);
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Info"
            {...a11yProps(0)}
            onClick={() => navigate(`/book/${bookId}`)}
          />
          <Tab
            label="Reviews"
            {...a11yProps(1)}
            onClick={() => navigate(`/book/${bookId}/reviews`)}
          />
          <Tab
            label="Discussions"
            {...a11yProps(2)}
            onClick={() => navigate(`/book/${bookId}/discussions`)}
          />
        </Tabs>
      </Box>
      <Box sx={{ py: 3 }}>
        <Outlet />
      </Box>
      {/* <TabPanel value={value} index={0}>
        <BookInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BookReviews />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BookDiscussions />
      </TabPanel> */}
    </Box>
  );
}
