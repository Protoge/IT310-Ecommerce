import axios from "axios";
const instance = axios.create({
  baseURL: "https://flexwearfitness.onrender.com/",
});

export default instance;
