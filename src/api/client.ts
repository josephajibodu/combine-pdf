import axios from "axios";

export default axios.create({
  baseURL: "https://raw.githubusercontent.com/",
  headers: {
    "Content-type": "application/json",
  },
});
