import axios from "axios";
import { URL } from "../url";

const BASE_URL = `${URL}/api/v1/umla`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
