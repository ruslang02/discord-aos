import { Client } from "./Client";
import { ClientStatus } from "./ClientStatus";

export class Heartbeat {
    private timer?: number;

    constructor(private client: Client) {
        client.on("disconnect", () => this.timer && clearInterval(this.timer));
    }
    
    start(millis: number) {
        this.timer = setInterval(() => {
            if (this.client.status === ClientStatus.DISCONNECTED) {
                clearInterval(this.timer);
            } else {
                this.client.ws.send({
                    op: 1,
                    d: null,
                });
            }
        }, millis)
    }
}