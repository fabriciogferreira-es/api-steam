import request from "./../request";

export default {
  async getDataByCep(cep) {
    const response = await request.get(`${cep}/json/`);
    return response.data;
  },
};
