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
import BookInfo from "./pages/Book/BookInfo/BookInfo";
import BookReviews from "./pages/Book/BookReviews/BookReviews";
import BookDiscussions from "./pages/Book/BookDiscussions/BookDiscussions";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileInfo from "./pages/Profile/Info/ProfileInfo";
import ProfileLibrary from "./pages/Profile/Library/ProfileLibrary";
import ProfileCollections from "./pages/Profile/Collections/ProfileCollections";
import ProfileReviews from "./pages/Profile/Reviews/ProfileReviews";

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

              <Route path="book/:bookId" element={<BookPage />}>
                <Route index element={<BookInfo />} />
                <Route path="reviews" element={<BookReviews />} />
                <Route path="discussions" element={<BookDiscussions />} />
              </Route>

              <Route path="user/:userId" element={<ProfilePage />}>
                <Route index element={<ProfileInfo />} />
                <Route path="library" element={<ProfileLibrary />} />
                <Route path="collections" element={<ProfileCollections />} />
                <Route path="reviews" element={<ProfileReviews />} />
              </Route>

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
