import { io } from "socket.io-client";
import { URL } from "../url";

export const socket = new io(URL, {
  path: "/partnerSocket",
  autoConnect: false,
  withCredentials: false,
});
