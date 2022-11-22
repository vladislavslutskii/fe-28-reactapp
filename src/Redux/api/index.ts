import { create } from "apisauce";
import { PER_PAGE } from "../../Utils";
import {
  ActivationParams,
  AuthUserPayload,
  UserActionPayload,
} from "../../Utils/globalTypes";

// apisauce -> обертка над axios -> обертка над fetch

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

// API: "https://studapi.teachmeskills.by", + "/auth/users/" - а довезти до BE - userData
// createNewUser(userData)
// fetch("https://studapi.teachmeskills.by/auth/users/", method: 'POST', body: userData)

const createNewUser = (userData: UserActionPayload) => {
  return API.post("/auth/users/", userData); // - тело;
};

const getPostsList = (offset: number, ordering: string) => {
  return API.get("/blog/posts/", { limit: PER_PAGE, offset, ordering });
};

const activateNewUser = (params: ActivationParams) => {
  return API.post("/auth/users/activation/", params); // - тело;
};

const getPost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

const authUser = (params: AuthUserPayload) => {
  return API.post("/auth/jwt/create/", params);
};

const getCurrentUser = (token: string) => {
  return API.get(
    "/auth/users/me/",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const verifyToken = (token: string) => {
  return API.post("/auth/jwt/verify/", { token });
};

const refreshToken = (refresh: string) => {
  return API.post("/auth/jwt/refresh/", { refresh });
};

const getSearchedPosts = (search: string, offset: number) => {
  return API.get("/blog/posts/", { search, limit: 10, offset });
};
const getMyPostsList = (token: string) => {
  return API.get(
    "/blog/posts/my_posts/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const addNewPost = (token: string, data: any) => {
  return API.post("/blog/posts/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const saveEditedPost = (token: string, id: string, data: any) => {
  return API.put(`/blog/posts/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
const deletePost = (token: string, id: string) => {
  return API.delete(
    `/blog/posts/${id}/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  createNewUser,
  getPostsList,
  activateNewUser,
  getPost,
  authUser,
  getCurrentUser,
  verifyToken,
  refreshToken,
  getSearchedPosts,
  getMyPostsList,
  addNewPost,
  saveEditedPost,
  deletePost,
};
