import axios from "axios";


const $a = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
  }
})

export default $a;
