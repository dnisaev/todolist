import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "2305dcac-73f2-4121-9dcd-60e2c86f4b66",
  },
});
