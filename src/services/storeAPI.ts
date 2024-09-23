import axios from "axios";
import { LOCAL_BACKEND_URL } from "@/constants/general.constants.ts";

export const storeAPI = axios.create({
  baseURL: LOCAL_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});
