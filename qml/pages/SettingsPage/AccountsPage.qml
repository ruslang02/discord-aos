import QtQuick 2.0
import Sailfish.Silica 1.0
import "../../components"
import "./AccountsPage.js" as Js

Page {
    id: page

    allowedOrientations: Orientation.Portrait

    Component.onCompleted: Js.handleReady()

    SilicaListView {
        id: listView
        width: parent.width
        height: parent.height
        header: PageHeader {
            title: qsTr("Accounts")
        }
        model: ListModel {
            id: listModel
            ListElement {
                account_id: 0
                avatar: "image://theme/icon-m-share-mms"
                username: "Nelly"
                discriminator: "0001"
                isDefault: false
                token: ""
            }
        }
        delegate: ListItem {
            menu: ContextMenu {
                MenuItem {
                    onClicked: Js.connectAccount(account_id)
                    text: "Connect"
                }
                MenuItem {
                    onClicked: Js.makeDefaultAccount(account_id)
                    text: "Make default"
                }
                MenuItem {
                    onClicked: Js.removeAccount(account_id)
                    text: "Remove"
                }
            }
            onClicked: Js.connectAccount(account_id)
            contentHeight: Theme.dp(96)
            CircularImage {
                id: icon
                source: avatar || "image://theme/icon-m-question"
                width: Theme.dp(72)
                height: Theme.dp(72)
                anchors {
                    left: parent.left
                    leftMargin: Theme.paddingLarge
                    top: parent.top
                    topMargin: Theme.paddingMedium
                }
            }
            Label {
                id: usernameLabel
                text: username ? username + "#" + discriminator : "Not configured yet"
                anchors {
                    left: icon.right
                    leftMargin: Theme.paddingLarge
                    top: icon.top
                }
            }
            Label {
                id: statusLabel
                text: window.client.token == token ? window.client.statusText : "Disconnected"
                color: window.client.token == token ? window.client.statusColor : Theme.secondaryColor
                font.pixelSize: Theme.fontSizeSmall
                anchors {
                    left: icon.right
                    leftMargin: Theme.paddingLarge
                    bottom: icon.bottom
                }
            }
            Icon {
                source: "image://theme/icon-s-favorite"
                color: "#A0A000"
                width: Theme.dp(48)
                height: Theme.dp(48)
                fillMode: Image.Pad
                opacity: isDefault ? 1.0 : 0.0
                anchors {
                    right: parent.right
                    rightMargin: Theme.paddingMedium
                    top: parent.top
                    bottom: parent.bottom
                }
            }
        }
        PullDownMenu {
            MenuItem {
                id: addItem
                text: "Add new account"
            }
        }
        ViewPlaceholder {
            enabled: listView.count == 0
            text: "No account configured yet"
            hintText: "Pull down to add an account"
        }
    }
}