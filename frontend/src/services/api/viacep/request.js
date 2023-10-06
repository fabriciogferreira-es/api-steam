import axios from "axios";

const request = axios.create({
  baseURL: "https://viacep.com.br/ws/"
});

export default request;