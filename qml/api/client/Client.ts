import { Guild } from "api/structures/Guild";
import { UserSettings } from "api/structures/UserSettings";
import { Account } from "store/Settings";
import { PrivateChannel } from "../structures/PrivateChannel";
import { User } from "../structures/User";
import { AccountManager } from "./AccountManager";
import { ClientEventCallbackArgs, ClientEvents } from "./ClientEvents";
import { ClientStatus } from "./ClientStatus";
import { Heartbeat } from "./Heartbeat";
import { SocketManager } from "./socket/SocketManager";

export class Client {
    private listeners: Partial<Record<ClientEvents, (() => void)[]>> = {};
    private _status: ClientStatus = ClientStatus.DISCONNECTED;

    account?: Account;
    heartbeat = new Heartbeat(this);
    guilds: Record<string, Guild> = {};
    privateChannels: Record<string, PrivateChannel> = {};
    token?: string;
    user?: User;
    userSettings?: UserSettings;
    users: Record<string, User> = {};
    ws: SocketManager;

    constructor() {
        this.ws = new SocketManager(this);
        this.on("disconnect", reason => this.handleDisconnect(reason));
        this.on("ready", () => this.handleReady());
    }

    get status() {
        return this._status;
    }

    get statusText() {
        switch (this._status) {
            case ClientStatus.DISCONNECTED:
                return qsTr("Disconnected");
            case ClientStatus.CONNECTING:
                return qsTr("Connecting...");
            case ClientStatus.CONNECTED:
                return qsTr("Connected");
        }
    }

    get statusColor() {
        switch (this._status) {
            case ClientStatus.DISCONNECTED:
                return Theme.secondaryColor;
            case ClientStatus.CONNECTING:
                return "#A0A000";
            case ClientStatus.CONNECTED:
                return "#00C000";
        }
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

    handleDisconnect(reason: string) {
        if (this._status === ClientStatus.CONNECTING) {
            remorse.cancelText = "Could not sign in";
            remorse.execute("Please check your user token");
        }
        this._status = ClientStatus.DISCONNECTED;
    }

    handleReady() {
        this._status = ClientStatus.CONNECTED;
        AccountManager.update({
            ...this.account!,
            username: this.user?.username,
            discriminator: this.user?.discriminator,
            avatar: this.user?.avatarURL
        })
    }

    login(account: Account) {
        this.account = account;
        this.token = account.token;
        this._status = ClientStatus.CONNECTING;
        this.ws.connect();
    }

    setBackground(background: boolean) {
        this.ws.setBackground(background);
    }

    ready() {
        this.ws.ready();
    }
}
