import { Snowflake } from "../utils/Snowflake";
import { MessageAttachmentDto } from "./MessageAttachment";
import { UserDto } from "./User";

export interface MessageDto {
    id: Snowflake
    channel_id: Snowflake
    guild_id?: Snowflake
    author: UserDto
    content: string
    timestamp: string
    edited_timestamp: string | null
    mentions: UserDto[]
    attachments: MessageAttachmentDto[]
}