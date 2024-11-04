import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//axios instance for user protected routes
export const UserAxiosInstance = () => {

  const userAxiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", 
    headers: {
      "Content-Type": "application/json",
    }
  });

  return userAxiosInstance;
}






