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
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatCalendar: (payload, callback, onRejected) => {
    accidentApi
      .get(`/stat/calendar?year=${payload}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatTopTen: (payload, callback, onRejected) => {
    accidentApi
      .get(`/stat/road/topten?year=${payload}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatTimeBar: ({ start, end }, callback, onRejected) => {
    accidentApi
      .get(`/stat/timebar?start=${start}&end=${end}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchLocationMap: ({ start, end }, callback, onRejected) => {
    accidentApi
      .get(`/map?start=${start}&end=${end}`)
      .then(({ data }) => {
        callback(data);
      })
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatCount: ({ mode, date }, callback, onRejected) => {
    accidentApi
      .get(`/stat/count?mode=${mode}&date=${date}`)
      .then(({ data }) => {
        callback(data);
      })
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchMap: ({ start, end }, callback, onRejected) => {
    authApi
      .get(`/accident/map?start=${start}&end=${end}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
};

export const DrowsinessService = {
  fetchHeatmap: ({ start, end }, callback, onRejected) => {
    drowsinessApi
      .get(`/map?start=${start}&end=${end}`)
      .then(({ data }) => {
        callback(data);
      })
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatCalendar: (payload, callback, onRejected) => {
    drowsinessApi
      .get(`/stat/calendar?year=${payload}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatTimeBar: ({ start, end }, callback, onRejected) => {
    drowsinessApi
      .get(`/stat/timebar?start=${start}&end=${end}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchStatCount: ({ mode, date }, callback, onRejected) => {
    drowsinessApi
      .get(`/stat/count?mode=${mode}&date=${date}`)
      .then(({ data }) => {
        callback(data);
      })
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchMap: ({ start, end }, callback, onRejected) => {
    authApi
      .get(`/drowsiness/map?start=${start}&end=${end}`)
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
  getProfile: (callback, onRejected) => {
    authApi
      .get(`/profile`)
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
  addDriver: (payload, callback, onRejected) => {
    authApi
      .post("/driver", payload)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchAccident: (payload, callback, onRejected) => {
    authApi
      .get(`/driver/${payload}/accident`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchDrowsiness: (payload, callback, onRejected) => {
    authApi
      .get(`/driver/${payload}/drowsiness`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchAccidentTimeBar: (payload, callback, onRejected) => {
    authApi
      .get(`/driver/${payload}/accident/stat/timebar`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  fetchDrowsinessTimeBar: (payload, callback, onRejected) => {
    authApi
      .get(`/driver/${payload}/drowsiness/stat/timebar`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  deleteDriver: (payload, callback, onRejected) => {
    authApi
      .delete(`/driver/${payload}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  editDriver: (driver_id, payload, callback, onRejected) => {
    authApi
      .patch(`/driver/${driver_id}`, payload)
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
  addCar: (payload, callback, onRejected) => {
    authApi
      .post("/car", payload)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  deleteCar: (payload, callback, onRejected) => {
    authApi
      .delete(`/car/${payload}`)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
  editCar: (car_id, payload, callback, onRejected) => {
    authApi
      .patch(`/car/${car_id}`, payload)
      .then(({ data }) => callback(data))
      .catch((response) => {
        onRejected(response.response ? response.response.data : response);
      });
  },
};
