import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PagesWrapper from "../PagesWrapper";
import AuthSelectors from "../../Redux/selectors/authSelectors";

import SignIn from "../SignIn";
import SignUp from "../SignUp";
import PostContent from "../PostContent";
import ActivateUser from "../ActivateUser";
import ConfirmRegistation from "../ConfirmRegistation";
import Search from "../Search";
import AddNewPost from "../AddNewPost";

export enum PathNames {
  Home = `/`,
  SignIn = `/Signin`,
  SignUp = `/signup`,
  Post = `/posts/:id`,
  Modal = `/modal`,
  PostContent = "/content/:id",
  ActivateUser = `/activate/:uid/:token`,
  ConfirmRegistation = `/confirm`,
  MyPosts = "/my-posts",
  Search = "/search",
  NewPost = "/add",
  EditPost = "/posts/:id/edit",
}

const Router = () => {
  const isAuthenticated = useSelector(AuthSelectors.getAuthStatus);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathNames.Home} element={<PagesWrapper></PagesWrapper>}>
          <Route
            path={PathNames.SignIn}
            element={
              !isAuthenticated ? (
                <SignIn />
              ) : (
                <Navigate to={PathNames.Home} replace />
              )
            }
          />

          <Route
            path={PathNames.SignUp}
            element={
              !isAuthenticated ? (
                <SignUp />
              ) : (
                <Navigate to={PathNames.Home} replace />
              )
            }
          />
          <Route
            path={PathNames.PostContent}
            element={<PostContent></PostContent>}
          ></Route>
          <Route
            path={PathNames.ActivateUser}
            element={<ActivateUser></ActivateUser>}
          ></Route>
          <Route
            path={PathNames.ConfirmRegistation}
            element={<ConfirmRegistation></ConfirmRegistation>}
          ></Route>

          <Route path={PathNames.Search} element={<Search></Search>} />
          <Route path={PathNames.NewPost} element={<AddNewPost />} />
          <Route path={PathNames.EditPost} element={<AddNewPost />} />
        </Route>
        <Route
          path={`*`}
          element={<Navigate to={PathNames.Home}></Navigate>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
