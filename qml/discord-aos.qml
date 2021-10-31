import QtQuick 2.0
import QtQuick.LocalStorage 2.0
import Sailfish.Silica 1.0
import "pages"
import "./init.js" as Js

ApplicationWindow {
    id: window

    allowedOrientations: defaultAllowedOrientations

    Component.onCompleted: Js.handleReady()
    
    function module() {}

    function exports() {}

    function require(url) {
        return Js.require(url);
    }

    function setTimeout(callback, timeout) {
        const timer = Qt.createQmlObject("import QtQuick 2.0; Timer {}", window);

        timer.interval = timeout || 1;
        timer.repeat = false;
        timer.triggered.connect(callback);
        timer.start();

        return Js.timers.push(timer) - 1;
    }

    function clearTimeout(index) {
        const timer = Js.timers[index];

        if (!timer) return;

        timer.stop();
        delete Js.timers[index];
    }

    function setInterval(callback, timeout) {
        const timer = Qt.createQmlObject("import QtQuick 2.0; Timer {}", window);

        timer.interval = timeout || 1;
        timer.repeat = true;
        timer.triggered.connect(callback);
        timer.start();

        return Js.timers.push(timer) - 1;
    }

    function clearInterval(index) {
        const timer = Js.timers[index];

        if (!timer) return;

        timer.stop();
        delete Js.timers[index];
    }
}
