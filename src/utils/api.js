import axios from "axios";
import { config } from "../config/config";
import { AccidentData } from "../mock/Coordinate";
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
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatCalendar: (callback, onRejected) => {
    accidentApi
      .get(`/stat/calendar`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatRoadPie: (callback, onRejected) => {
    accidentApi
      .get(`/stat/roadpie`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatTimeBar: (callback, onRejected) => {
    accidentApi
      .get(`/stat/timebar`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
};

export const DrowsinessService = {
  fetchHeatmap: (payload, callback, onRejected) => {
    drowsinessApi
      .get(`/heatmap/${payload}`)
      .then(({ data }) => {
        callback(data);
      })
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatCalendar: (callback, onRejected) => {
    drowsinessApi
      .get(`/stat/calendar`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatTimeBar: (callback, onRejected) => {
    drowsinessApi
      .get(`/stat/timebar`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
};

export const AuthService = {
  login: (payload, callback, onRejected) => {
    authApi
      .post(`/login`, payload)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  logout: (callback, onRejected) => {
    authApi
      .post(`/logout`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
};

export const DriverService = {
  fetchAllDriver: (callback, onRejected) => {
    authApi
      .get(`/driver`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchDriver: (payload, callback, onRejected) => {
    authApi
      .get(`/driver/${payload}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  AddDriver: (payload, callback, onRejected) => {
    authApi
      .post("/driver", payload)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
};

export const CarSerivce = {
  fetchAllCar: (callback, onRejected) => {
    authApi
      .get("/car")
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchCar: (payload, callback, onRejected) => {
    authApi
      .get(`/car/${payload}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
};
