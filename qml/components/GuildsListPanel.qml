import QtQuick 2.0
import Sailfish.Silica 1.0
import "./GuildsListPanel.js" as Js

Item {
    property var elements
    property var elementSize
    property var spacing
    property var active: "dm"

    width: parent.width

    Component.onCompleted: Js.handleReady()

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
            id: listModel
        }
        delegate: Item {
            width: elementSize + spacing
            ServerPanelImageButton {
               imageSource: icon
               onClicked: active = icon
               state: active == icon ? "active" : ""
            }
        }
        orientation: ListView.Horizontal
    }
}