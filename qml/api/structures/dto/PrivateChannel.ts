import { Snowflake } from "../utils/Snowflake";
import { UserDto } from "./User";

export interface PrivateChannelDto {
    id: Snowflake
    type: number
    last_message_id: Snowflake
    recipients: UserDto[]
}