import axios from "axios";

//console.log("Base: " + (await token.getAcessToken()));

const requestStore = axios.create({
  baseURL: "https://store.steampowered.com/"
});

const requestApi = axios.create({
  baseURL: "https://api.steampowered.com/"
})

export default {
  requestStore,
  requestApi
};
