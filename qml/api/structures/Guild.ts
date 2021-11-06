import { Client } from "api/client/Client";
import { GuildDto } from "./dto/Guild";
import { Snowflake } from "./utils/Snowflake";

export class Guild {
    id!: Snowflake
    name!: string
    icon?: string
    splash?: string

    constructor(private client: Client, data: GuildDto) {
        this._patch(data);
    }

    get iconURL() {
        return this.icon && `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.png`
    }

    get position() {
        if (!this.client?.user || !this.id) {
          return null;
        }
      
        if (!this.client.userSettings?.guildPositions) {
          return null;
        }
      
        return this.client.userSettings.guildPositions.indexOf(this.id);
    }

    private _patch(data: GuildDto) {
        this.id = data.id;
        this.name = data.name;
        if ("icon" in data) {
            this.icon = data.icon ?? undefined;
        }
        if ("splash" in data) {
            this.splash = data.splash ?? undefined;
        }
    }
}