import QtQuick 2.0
import Sailfish.Silica 1.0
import "../../components"

Page {
    id: page

    allowedOrientations: Orientation.Portrait

    SilicaListView {
        id: listView
        width: parent.width
        height: parent.height
        header: PageHeader {
            title: qsTr("Settings")
        }
        model: ListModel {
            ListElement {
                iconSource: "image://theme/icon-m-users"
                pageUrl: "./AccountsPage.qml"
                title: qsTr("Accounts")
            }
            ListElement {
                iconSource: "image://theme/icon-m-developer-mode"
                pageUrl: "./AccountsPage.qml"
                title: qsTr("Developer options")
            }
        }
        delegate: ListItem {
            contentHeight: Theme.dp(72)
            onClicked: window.pageStack.push(pageUrl)
            Icon {
                id: icon
                source: iconSource
                width: Theme.dp(48)
                height: Theme.dp(48)
                anchors {
                    left: parent.left
                    leftMargin: Theme.paddingLarge
                    top: parent.top
                    topMargin: Theme.paddingMedium
                }
            }
            Label {
                text: title
                anchors {
                    left: icon.right
                    leftMargin: Theme.paddingLarge
                    top: icon.top
                    bottom: icon.bottom
                }
                verticalAlignment: Text.AlignVCenter
            }
        }
    }
}