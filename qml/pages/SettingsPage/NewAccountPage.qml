import QtQuick 2.0
import Sailfish.Silica 1.0
import "../../components"
import "./NewAccountPage.js" as Js

Dialog {
    id: dialog

    allowedOrientations: Orientation.Portrait

    Component.onCompleted: Js.handleReady()

    Column {
        width: parent.width

        DialogHeader { 
            acceptText: "Connect"
            title: "Add an account"
        }

        TextField {
            id: tokenField
            width: parent.width
            placeholderText: "Authorization token"
            label: "Token"
        }
    }
}