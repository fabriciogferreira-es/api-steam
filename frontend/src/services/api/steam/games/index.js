import baseResquest from "../baseResquest";

export default {
  async getAllGames() {
    const response = await baseResquest.requestApi.get('ISteamApps/GetAppList/v2/');
    return response.data.applist.apps;
  },
  async getGame(appid){
    const response = await baseResquest.requestStore.get(`api/appdetails?appids=${appid}`);
    return response.data[appid].data;
  }
};

