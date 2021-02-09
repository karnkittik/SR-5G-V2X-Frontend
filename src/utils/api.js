import axios from "axios";
import { config } from "../config/config";
const accidentApi = axios.create({
  baseURL: `${config.baseURL}/api/web/accident`,
  headers: {
    "Content-Type": "application/json",
  },
});
const drowsinessApi = axios.create({
  baseURL: `${config.baseURL}/api/web/drowsiness`,
  headers: {
    "Content-Type": "application/json",
  },
});
const authApi = axios.create({
  baseURL: `${config.baseURL}/api/web/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const AccidentService = {
  fetchHeatmap: (payload, callback, onRejected) => {
    accidentApi
      .get(`/heatmap/${payload}`)
      .then(({ data }) => {
        callback(data);
      })
      .catch(({ response }) => {
        onRejected(response.data);
      });
  },
  fetchStatCalendar: (callback, onRejected) => {
    accidentApi
      .get(`/stat/calendar`)
      .then(({ data }) => callback(data))
      .catch(({ response }) => onRejected(response.data));
  },
  fetchStatRoadPie: (callback, onRejected) => {
    accidentApi
      .get(`/stat/roadpie`)
      .then(({ data }) => callback(data))
      .catch(({ response }) => onRejected(response.data));
  },
  fetchStatTimeBar: (callback, onRejected) => {
    accidentApi
      .get(`/stat/timebar`)
      .then(({ data }) => {
        callback(data);
      })
      .catch(({ response }) => onRejected(response.data));
  },
};

export const DrowsinessService = {
  fetchHeatmap: (payload, callback, onRejected) => {
    drowsinessApi
      .get(`/heatmap/${payload}`)
      .then(({ data }) => {
        callback(data);
      })
      .catch(({ response }) => {
        onRejected(response.data);
      });
  },
  fetchStatCalendar: (callback, onRejected) => {
    drowsinessApi
      .get(`/stat/calendar`)
      .then(({ data }) => callback(data))
      .catch(({ response }) => onRejected(response.data));
  },
  fetchStatTimeBar: (callback, onRejected) => {
    drowsinessApi
      .get(`/stat/timebar`)
      .then(({ data }) => callback(data))
      .catch(({ response }) => onRejected(response.data));
  },
};

export const AuthService = {
  login: (payload, callback, onRejected) => {
    authApi
      .post(`/login`, payload)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response.data));
  },
  logout: (callback, onRejected) => {
    authApi
      .post(`/logout`)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response.data));
  },
};
export const DriverService = {
  fetchAllDriver: (callback, onRejected) => {
    authApi
      .get(`/driver`)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response.data));
  },
  fetchDriver: (payload, callback, onRejected) => {
    authApi
      .get(`/driver/${payload}`)
      .then(({ data }) => callback({ data }))
      .catch(({ response }) => onRejected(response.data));
  },
};
