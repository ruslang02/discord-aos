import { PrivateChannel } from "../structures/PrivateChannel";
import { User } from "../structures/User";
import { ClientEventCallbackArgs, ClientEvents } from "./ClientEvents";
import { SocketManager } from "./socket/SocketManager";

export class Client {
    private listeners: Partial<Record<ClientEvents, (() => void)[]>> = {};

    privateChannels: Record<string, PrivateChannel> = {};
    token?: string;
    user?: User;
    users: Record<string, User> = {};
    ws: SocketManager;

    constructor() {
        console.log("creating socket manager");
        this.ws = new SocketManager(this);
    }

    emit<E extends ClientEvents>(event: E, ...args: ClientEventCallbackArgs[E]) {
        if (!this.listeners[event]) {
            return;
        }

        const stack = this.listeners[event]!.slice();

        for (let i = 0, l = stack.length; i < l; i++) {
            stack[i].apply(stack, args as []);
        }
    }

    on<E extends ClientEvents>(event: E, callback: (...args: ClientEventCallbackArgs[E]) => void) {
        let stack = this.listeners[event];

        if (!stack) {
            stack = this.listeners[event] = [];
        }

        stack.push(callback);
    }

    off<E extends ClientEvents>(event: E, callback: (...args: ClientEventCallbackArgs[E]) => void) {
        const stack = this.listeners[event];

        if (!stack) {
            return;
        }

        for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);

                return;
            }
        }
    }

    login(token: string) {
        this.token = token;
        this.ws.connect();
    }

    setBackground(background: boolean) {
        this.ws.setBackground(background);
    }

    ready() {
        this.ws.ready();
    }
}
