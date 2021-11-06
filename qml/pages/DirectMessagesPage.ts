import { Snowflake } from "api/structures/utils/Snowflake";

interface DMListModel {
    id: string
    userName: string
    userAvatar: string
}

declare const listModel: Qml.ListModel<DMListModel>;

export function handleReady() {
    window.client.on("ready", handleClientReady)
}

function handleDestroy() {
    window.client.off("ready", handleClientReady)
}

function handleClientReady() {
    const dms: DMListModel[] = Object.keys(window.client.privateChannels)
    .map(id => window.client.privateChannels[id])
    .filter((c) => c.lastMessageId !== null)
    .sort((a, b) => {
      const snA = Snowflake.deconstruct(a.lastMessageId);
      const snB = Snowflake.deconstruct(b.lastMessageId);

      return snB.timestamp - snA.timestamp;
    }).map(channel => {
        return {
            id: channel.id,
            userAvatar: channel.recipients[0].avatar 
            ? "https://cdn.discordapp.com/avatars/" +  channel.recipients[0].id + "/" + channel.recipients[0].avatar + ".png"
            : "https://cdn.discordapp.com/embed/avatars/" + (+channel.recipients[0].discriminator % 5) + ".png",
            userName: channel.recipients[0].username,
        }
    });
    dms.forEach(dm => listModel.append(dm));
}