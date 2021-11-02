import { Settings } from "store/Settings";

interface DMListModel {
    id: string
    userName: string
    userAvatar: string
}

declare const loginBtn: Qml.Button;
declare const listModel: Qml.ListModel<DMListModel>
function handleReady() {
    loginBtn.clicked.connect(() => {
        window.client.login(Settings.get("token"));
    });

    window.client.on("ready", () => {
        const dms: DMListModel[] = Object.keys(window.client.privateChannels)
        .map(id => {
            const channel = window.client.privateChannels[id];
            return {
                id,
                userAvatar: channel.recipients[0].avatar 
                ? "https://cdn.discordapp.com/avatars/" +  channel.recipients[0].id + "/" + channel.recipients[0].avatar + ".png"
                : "https://cdn.discordapp.com/embed/avatars/" + (+channel.recipients[0].discriminator % 5) + ".png",
                userName: channel.recipients[0].username,
            }
        });
        dms.forEach(dm => listModel.append(dm));
    })
}