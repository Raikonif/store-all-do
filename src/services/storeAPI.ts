import axios from "axios";
import { BACKEND_URL, LOCAL_BACKEND_URL } from "@/constants/general.constants.ts";

export const storeAPI = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});
