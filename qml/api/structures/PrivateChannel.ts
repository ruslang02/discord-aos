import { Client } from "../client/Client";
import { PrivateChannelDto } from "./dto/PrivateChannel";
import { Snowflake } from "./utils/Snowflake";

export class PrivateChannel {
    id!: Snowflake;
    type!: number;
    lastMessageId!: Snowflake;
    private recipientIds: string[] = [];

    constructor(private client: Client, dto: PrivateChannelDto) {
        this._patch(dto);
    }

    private _patch(data: PrivateChannelDto) {
        this.id = data.id;
        this.type = data.type;
        this.lastMessageId = data.last_message_id;
        this.recipientIds = data.recipients.map(r => r.id);
    }

    get recipients() {
        const recipients = this.recipientIds.map(id => this.client.users[id]);

        return recipients;
    }
}
