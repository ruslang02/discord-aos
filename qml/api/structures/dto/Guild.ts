import { Snowflake } from "../utils/Snowflake";

export interface GuildDto {
    id: Snowflake
    name: string
    icon: string | null
    splash: string | null
}