import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Components/Loader/Loader";
import ProtectedRoute from "./ProtectedRoute";

//components
import Header from "./Components/Header/Header.jsx";
import Home from "./Components/Home/Home.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import WatchItem from "./Components/WatchItem/WatchItem";
import Me from "./Components/Me/Me";
import EditProfile from "./Components/EditProfile/EditProfile.jsx";
import ResetPw from "./Components/ResetPw/ResetPw.jsx";
import MyList from "./Components/MyList/MyList.jsx";

const App = () => {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.userOptions
  );

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/welcome" /> : <Header />
              }
            />

            <Route element={<ProtectedRoute />}>
              <Route path="/welcome" element={<Home />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/movies" element={<Home type="movies" />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/series" element={<Home type="series" />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/watch/:id" element={<WatchItem />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/me" element={<Me />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/reset_password" element={<ResetPw />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/edit_profile" element={<EditProfile />} />
            </Route>

            
        <Route element={<ProtectedRoute />}>
          <Route path="/mylist" element={<MyList />} />
        </Route>

          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
