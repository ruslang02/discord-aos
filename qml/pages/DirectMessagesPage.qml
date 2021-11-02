import QtQuick 2.0
import Sailfish.Silica 1.0
import "./DirectMessagesPage.js" as Js
import "../components"

Page {
    id: page

    allowedOrientations: Orientation.All

    Component.onCompleted: Js.handleReady()

    Column {
        anchors.fill: parent
        SilicaListView {
            id: listView
            clip: true
            width: parent.width
            height: parent.height - Theme.dp(104)
            header: PageHeader {
                title: qsTr("Direct Messages")
            }
            model: ListModel {
                id: listModel
            }
            delegate: ListItem {
                menu: contextMenu
                contentHeight: Theme.dp(104)
                ListView.onRemove: animateRemoval(listItem)
                CircularImage {
                    id: avatar
                    width: Theme.dp(80)
                    anchors {
                        left: parent.left
                        leftMargin: Theme.dp(12)
                        top: parent.top
                        topMargin: Theme.dp(12)
                    }
                    source: userAvatar
                }
                Label {
                    anchors {
                        left: avatar.right
                        leftMargin: Theme.dp(12)
                        top: avatar.top
                    }
                    text: userName
                }
                Component {
                    id: contextMenu
                    ContextMenu {
                        MenuItem {
                            text: "Profile"
                        }
                    }
                }
            }
        }
        ServerPanel {
            elementSize: Theme.dp(80)
            height: Theme.dp(104)
            spacing: Theme.dp(12)
        }
    }

                Button {
                    id: loginBtn
                    text: "Login"
                    width: 150
                }
}