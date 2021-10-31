import { Settings } from "store/Settings";

declare const loginBtn: Qml.Button;

function handleReady() {
    loginBtn.clicked.connect(() => {
        window.client.login(Settings.get("token"));
    })
}