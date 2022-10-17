import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:9000/api/v1", //for the localhost
  //baseURL: "https://api.brightwayafrica.com/api/v1", // for production
  baseURL: "http://3.225.222.48/api/v1", // for production
});
