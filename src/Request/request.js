import axios from "axios";

const client = axios.create({ baseURL: "https://api.foody.gomaplus.tech/api" });
export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;
  client.defaults.timeout = 600000;

  return client(options).then((res) => res);
};
