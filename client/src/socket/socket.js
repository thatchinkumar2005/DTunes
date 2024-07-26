import io from "socket.io-client";
import { settings } from "../../settings";

export const socket = io(settings.socket);
