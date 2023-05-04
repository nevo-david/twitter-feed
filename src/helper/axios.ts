import axios, { CreateAxiosDefaults } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
} as CreateAxiosDefaults);
