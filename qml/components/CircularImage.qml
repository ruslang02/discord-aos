import QtQuick 2.3
import QtGraphicalEffects 1.0

Item {
    id: container
    property alias source: img.source
    property alias radius: mask.radius
    Image {
        id: img
        width: parent.width
        height: parent.width
        fillMode: Image.PreserveAspectCrop
        layer.enabled: true
        layer.effect: OpacityMask {
            maskSource: mask
        }
        anchors {
            left: container.left
            top: container.top
        }
    }

    Rectangle {
        id: mask
        width: parent.width
        height: parent.width
        radius: parent.width / 2
        visible: false
    }
}