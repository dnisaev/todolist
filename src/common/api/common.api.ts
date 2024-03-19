import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "4cd760bc-ec52-4b11-ad81-6e573de1fe96",
  },
});
