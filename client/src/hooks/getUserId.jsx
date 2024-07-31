import { jwtDecode } from "jwt-decode";

const getToken = () => localStorage.getItem("token");

export const getUserId = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return localStorage.setItem("userId", decodedToken.id);
  }
  return null;
};
