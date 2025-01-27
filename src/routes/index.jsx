/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../components/UI/Loading";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, selectUser } from "../feature/userSlice";
import { selectTeacher } from "../feature/teacherSlice";
import { auth } from "../firebase";
import Main from "../layouts/Main";
import Login from "../pages/auth/login";
import NotesSection from "../pages/Notes";

function TotalRoutes() {
  const user = useSelector(selectUser);
  const teacher = useSelector(selectTeacher);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setLoading(false);
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName ? authUser.displayName : "Teacher",
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
            type: authUser.photoURL ? "student" : "teacher",
            role:
              authUser.uid === "Rw5RRuLhgfbEwzJg1BiHj7QmrX42" ||
              authUser.uid === "8ZI2RQIph2c06LBNqeoDAbFBhDo2" ||
              authUser.uid === "X4zwd8gmoSWuU4sJO06ZLVyX3RJ3" ||
              authUser.uid === "E1kNP3BBnIYckqK6gxRzrRnT9RS2" ||
              authUser.uid === "PU6s7Fpvk8fvMKpLRF0uIyXaofq2"
                ? "Admin"
                : "",
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/notes-section" element={<NotesSection />} />

            {user ? (
              <Route path="/" element={<Main />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        )}
      </Suspense>
    </Router>
  );
}

export default TotalRoutes;
