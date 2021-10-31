/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from "../../structures/dto/Payload";
import { Client } from "../Client";
import { handlers } from "./handlers/index";

export class SocketManager {
    private isBackground = false;
    private socket!: Qml.WebSocket

    constructor(private client: Client) {
        this.socket = Qt.createQmlObject<Qml.WebSocket>("import QtWebSockets 1.0; WebSocket { }", window);
        console.log("created socket");
        this.socket.textMessageReceived.connect(this.handleMessage);
        this.socket.statusChanged.connect(status => {
            console.log(status);
            if (status > 2) {
                console.log(this.socket.errorString);
            }
        });
    }

    connect() {
        this.socket.url = "wss://gateway.discord.gg/?v=9&encoding=json";
    }

    ready() {
    }

    send(payload: Payload) {
        const json = JSON.stringify(payload);

        this.client.emit("debug", "Sending payload: " + json);
        this.socket?.sendTextMessage(json);
    }

    setBackground(bg: boolean) {
        this.isBackground = bg;
    }

    private handleBackgroundMessage = (msg: string) => {
        if (msg.indexOf("\"op\":0") !== -1) {
            if (msg.indexOf("\"t\":\"MESSAGE_CREATE\"") !== -1) {
                if (msg.indexOf("\"guild_id\"") === -1 || (
                    this.client.user && (msg.indexOf(this.client.user.id) !== -1)
                )) {
                    this.handleMessage(msg);
                }
            }
        } else {
            this.handleMessage(msg);
        }
    };

    private handleMessage = (msg: string) => {
        try {
            this.client.emit("debug", "Received payload: " + msg);
            this.handlePayload(JSON.parse(msg));
        } catch (e) {
        }
    };

    private handlePayload(payload: Payload) {
        switch (payload.op) {
            case -1:

            case 0:
                payload.t && handlers[payload.t]?.(this.client, payload as any);
                break;

            case 10:
                handlers.HELLO(this.client, payload as any);
                break;

            case 11:
                handlers.HEARTBEAT_ACK(this.client, payload);
                break;
        }
    }
}
