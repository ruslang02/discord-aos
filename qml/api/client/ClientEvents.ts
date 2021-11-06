import { MessageDto } from "../structures/dto/Message";

export type ClientEvents = "disconnect" | "debug" | "error" | "message" | "ready";

export interface ClientEventCallbackArgs {
    disconnect: [string],
    debug: [string]
    error: [Error]
    message: [MessageDto]
    ready: []
}