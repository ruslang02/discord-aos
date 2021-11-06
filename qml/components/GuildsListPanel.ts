import { Snowflake } from "api/structures/utils/Snowflake"

interface GuildModel {
    id: Snowflake
    name: string
    icon?: string
}
declare const listModel: Qml.ListModel<GuildModel>;

function handleReady() {
    window.client.on("ready", () => {
        const guilds = Object.keys(window.client.guilds).map(id => window.client.guilds[id]);
        guilds.sort((a, b) => (a.position || 0) - (b.position || 0)).forEach(guild => {
            listModel.append({
                id: guild.id,
                name: guild.name,
                icon: guild.iconURL
            })
        })
    })
}