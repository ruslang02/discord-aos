import { Snowflake } from "../utils/Snowflake";

export interface UserDto {
    id: Snowflake
    email?: string
    discriminator: string
    username: string
    avatar?: string
    public_flags?: number
}