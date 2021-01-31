import axios from "axios";
import { config } from "../config/config";
const accidentApi = axios.create({
  baseURL: `${config.baseURL}/api/web/accident`,
  headers: {
    "Content-Type": "application/json",
  },
});
const authApi = axios.create({
  baseURL: `http://localhost:8080/api/web/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const AccidentService = {
  fetchHeatmap: (payload, callback, onRejected) => {
    accidentApi
      .get(`/heatmap/${payload}`)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response));
  },
};

export const AuthService = {
  login: (payload, callback, onRejected) => {
    authApi
      .post(`/login`, payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response));
  },
};
