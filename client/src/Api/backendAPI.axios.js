import axios from "axios";
import { endpoints } from "../Endpoints/Endpoints";

export const backendAPI = axios.create({
  baseURL: endpoints.URL_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

function hasFile(data) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] instanceof File || data[key] instanceof Blob) {
        return true;
      }
    }
  }
  return false;
}

function formDataHasFile(formData) {
  if (formData instanceof FormData) {
    for (let value of formData.values()) {
      if (value instanceof File) {
        if (value.name != "") {
          return true;
        }
      }
    }
  }
  return false;
}

backendAPI.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const timestamp = localStorage.getItem("timestamp");

    if (token) {
      const now = new Date().getTime();
      const expiry = parseInt(timestamp);

      if (expiry < now) {
        try {
          let response = await fetch(endpoints.URL_API + endpoints.REFRESH, {
            method: "POST",
            body: JSON.stringify({
              refresh: refresh,
            }),
            headers: { "Content-Type": "application/json" },
          });

          response = await response.json();
          localStorage.setItem("access", response.access);
          localStorage.setItem("timestamp", now + 5 * 60 * 1000);
          config.headers.Authorization = `Bearer ${response.access}`;
        } catch (error) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("timestamp");
          console.error(error);
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (
        config.data &&
        ["post", "patch", "put"].includes(config.method)
        //   (config.method === "post" ||
        //     config.method === "patch" ||
        //     config.method === "put")
      ) {
        if (formDataHasFile(config.data) || hasFile(config.data)) {
          config.headers["Content-Type"] = "multipart/form-data";
        }
      }
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);
