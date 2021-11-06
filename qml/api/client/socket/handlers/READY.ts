import { Client } from "api/client/Client";
import { ReadyEventDto } from "api/structures/dto/events/Ready";
import { Payload } from "api/structures/dto/Payload";
import { Guild } from "api/structures/Guild";
import { PrivateChannel } from "api/structures/PrivateChannel";
import { User } from "api/structures/User";
import { UserSettings } from "api/structures/UserSettings";

export function READY(client: Client, { d: data }: Payload<ReadyEventDto>) {
    if (!data) return;
    client.user = new User(client, data.user);
    if (data.user_settings) {
        client.userSettings = new UserSettings(client.user, data.user_settings);
    }
    data.guilds.forEach(guild => {
        client.guilds[guild.id] = new Guild(client, guild);
    })
    data.private_channels.forEach(channel => {
        const [recipient] = channel.recipients;

        client.users[recipient.id] = new User(client, recipient);
        client.privateChannels[channel.id] = new PrivateChannel(client, channel);
    });

    client.emit("ready");
}