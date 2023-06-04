import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";
import Navbar from "./common/layouts/Navbar";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />

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
