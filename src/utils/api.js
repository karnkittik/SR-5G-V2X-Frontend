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
      .then(({ data }) => callback(data))
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
