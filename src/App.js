import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";
import Navbar from "./common/layouts/Navbar";
import Search from "./pages/Search/Search";
import BookPage from "./pages/Book/BookPage";
import Feed from "./pages/Feed/Feed";
import Logout from "./pages/Logout/Logout";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="feed" element={<Feed />} />
              <Route path="search" element={<Search />} />
              <Route path="book" element={<BookPage />} />

              <Route path="logout" element={<Logout />} />

              <Route path="error" element={<ErrorPage />} />

              <Route path="*" element={<Navigate to="/error" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
