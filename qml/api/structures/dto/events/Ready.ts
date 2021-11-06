import { GuildDto } from "../Guild";
import { PrivateChannelDto } from "../PrivateChannel";
import { UserDto } from "../User";

export interface ReadyEventDto {
    guilds: GuildDto[]
    user: UserDto
    user_settings: Record<string, unknown>
    private_channels: PrivateChannelDto[]
}