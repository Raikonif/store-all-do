import { storeAPI } from "@/services/storeAPI.ts";

export const signalLogin = async (email: string) => {
  const decodedEmail = decodeURIComponent(email);
  return await storeAPI.post("/api/authenticate/magic_link", {
    method: "POST",
    body: JSON.stringify({
      email: decodedEmail,
    }),
    credentials: "include",
  });
};

export const signalLogout = async () => {
  return await storeAPI.post("/api/authenticate/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const signalRegister = async (email: string, password: string) => {
  return await storeAPI.post("/api/authenticate/register", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
  });
};

export const signalVerify = async () => {
  return await storeAPI.post("/api/authenticate/verify", {
    method: "POST",
    credentials: "include",
  });
};

export const signalTokenVerify = async (token: string) => {
  return await storeAPI.post("/api/authenticate/token", {
    method: "POST",
    body: JSON.stringify({
      token: token,
    }),
    credentials: "include",
  });
};

export const signalOTP = async (email: string) => {
  return await storeAPI.post("/api/otp/send-otp", {
    user_id: email,
  });
};
