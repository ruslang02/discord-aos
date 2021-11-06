import { Client } from "../client/Client";
import { UserDto } from "./dto/User";
import { Snowflake } from "./utils/Snowflake";

export class User {
    id!: Snowflake;
    email?: string;
    discriminator!: string;
    username!: string;
    avatar?: string;

    constructor(private client: Client, dto: UserDto) {
        this._patch(dto);
    }

    _patch(data: UserDto) {
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.id = data.id;
        this.email = data.email;
        this.avatar = data.avatar;
    }

    get avatarURL() {
        return this.avatar 
        ? "https://cdn.discordapp.com/avatars/" +  this.id + "/" + this.avatar + ".png"
        : "https://cdn.discordapp.com/embed/avatars/" + (+this.discriminator % 5) + ".png"
    }
}
