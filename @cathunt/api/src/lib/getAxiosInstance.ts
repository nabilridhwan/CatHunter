import axios from "axios";


const axiosInstanceWithAuth = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem("access_token")}`
  }
})

export default axiosInstanceWithAuth;
