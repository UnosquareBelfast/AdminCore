import axios from "axios";

const baseURL = "http://localhost"; //Change to come from env later
const token = localStorage.getItem("id_token");

const instance = axios.create({
  baseURL,
  headers: {
    authorization: token ? "Bearer " + token : "",
  },
});

export default instance;
