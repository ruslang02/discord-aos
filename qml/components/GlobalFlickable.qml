import QtQuick 2.0
import Sailfish.Silica 1.0
import "./GlobalFlickable.js" as Js

SilicaFlickable {
    anchors.fill: parent
    id: flickable
    quickScroll: false
    Component.onCompleted: Js.handleReady()
    PushUpMenu {
        highlightColor: active ? Theme.highlightColor : "transparent"
        MenuItem {
            id: loginBtn
            text: qsTr("Sign in")
        }
        MenuItem {
            id: settingsItem
            text: qsTr("Settings")
        }
        MenuItem {
            id: aboutItem
            text: qsTr("About")
        }
    }
}