import QtQuick 2.0
import Sailfish.Silica 1.0

Item {
    property var elementSize
    property var spacing
    width: parent.width
    property var active: "dm"
    SilicaListView {
        height: parent.height
        footer: Item { width: spacing }
        header: Item {
            width: elementSize + spacing * 3
            ServerPanelIconButton {
                iconSource: "image://theme/icon-m-users"
                onClicked: active = "dm"
                state: active == "dm" ? "active" : ""
                anchors {
                    left: parent.left
                    leftMargin: spacing
                }
            }
            Rectangle {
                width: Theme.dp(2)
                height: Theme.dp(40)
                color: Theme.rgba(Theme.highlightColor, 0.5)
                anchors {
                    right: parent.right
                    rightMargin: spacing - Theme.dp(1)
                    top: parent.top
                    topMargin: elementSize / 2 - Theme.dp(20) + spacing
                }
            }
        }
        width: parent.width
        id: listView
        model: ListModel {
            ListElement { url: "https://cdn.discordapp.com/avatars/708451673189777428/84db3e8b4c7a57f2b28ed6e93c697ebe.webp?size=80&1"}
            ListElement { url: "https://cdn.discordapp.com/avatars/708451673189777428/84db3e8b4c7a57f2b28ed6e93c697ebe.webp?size=80&2"}
            ListElement { url: "https://cdn.discordapp.com/avatars/708451673189777428/84db3e8b4c7a57f2b28ed6e93c697ebe.webp?size=80&3"}
            ListElement { url: "https://cdn.discordapp.com/avatars/708451673189777428/84db3e8b4c7a57f2b28ed6e93c697ebe.webp?size=80&4"}
            ListElement { url: "https://cdn.discordapp.com/avatars/708451673189777428/84db3e8b4c7a57f2b28ed6e93c697ebe.webp?size=80&5"}
            ListElement { url: "https://cdn.discordapp.com/avatars/708451673189777428/84db3e8b4c7a57f2b28ed6e93c697ebe.webp?size=80&6"}
            ListElement { url: "https://cdn.discordapp.com/avatars/708451673189777428/84db3e8b4c7a57f2b28ed6e93c697ebe.webp?size=80&7"}
        }
        delegate: Item {
            width: elementSize + spacing
            ServerPanelImageButton {
               imageSource: url
               onClicked: active = url
               state: active == url ? "active" : ""
            }
        }
        orientation: ListView.Horizontal
    }
}