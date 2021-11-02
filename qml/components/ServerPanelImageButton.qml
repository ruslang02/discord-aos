import QtQuick 2.0
import Sailfish.Silica 1.0

Item {
    property alias imageSource: image.source
    signal clicked

    id: item
    height: elementSize + spacing * 2
    width: elementSize

    Rectangle {
        id: indicator
        width: elementSize / 1.5
        height: Theme.dp(12)
        radius: Theme.dp(6)
        color: "#00000000"
        anchors {
            left: parent.left
            leftMargin: elementSize / 6
            bottom: parent.bottom
            bottomMargin: -Theme.dp(6)
        }
    }

    Rectangle {
        id: container
        radius: elementSize / 2
        width: elementSize
        height: elementSize
        anchors {
            left: parent.left
            top: parent.top
            topMargin: spacing
        }
        color: Theme.rgba(Theme.highlightColor, 0.25)
    }

    CircularImage {
        id: image
        width: elementSize
        anchors {
            left: parent.left
            top: parent.top
            topMargin: spacing
        }
    }

    MouseArea {
        id: mouseArea
        anchors.fill: parent
        // preventStealing: true
        onClicked: item.clicked()
    }

    states: [
        State {
            name: "active"
            PropertyChanges {
                target: indicator
                color: "white"
            }
            PropertyChanges {
                target: image
                radius: elementSize / 3
            }
            PropertyChanges {
                target: container
                radius: elementSize / 3
                color: Theme.rgba(Theme.highlightColor, 0.5)
            }
        },
        State {
            name: "unread"
            PropertyChanges {
                target: indicator
                color: "white"
                width: Theme.dp(12)
            }
        }
    ]
}