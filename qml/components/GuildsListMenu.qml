import QtQuick 2.0
import Sailfish.Silica 1.0

PushUpMenu {
    bottomMargin: 0
    topMargin: 0
    MenuLabel {
        height: Theme.dp(104)
        ServerPanel {
            elementSize: Theme.dp(80)
            height: Theme.dp(104)
            spacing: Theme.dp(12)
        }
    }
}