import axios from "axios";

export default {
  async getAcessToken() {
    const client_id = "52051p312vkew8736wc444cixy1fbu";
    const client_secret = "uz8o1v64uiv30gixiek0rffwgl22nd";
    try {
      const response = await axios.post(
        `https://id.twitch.tv/oauth2/token?`,
        `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
        {}
      );
      console.log('Token: ' + response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  },
};
