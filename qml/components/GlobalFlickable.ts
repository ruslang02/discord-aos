import { AccountManager } from "api/client/AccountManager";

declare const loginBtn: Qml.Button;
declare const settingsItem: Qml.ListItem;

function handleReady() {
    loginBtn.clicked.connect(() => {
        try {
            AccountManager.connectDefault();
        } catch(e) {
            remorse.cancelText = "Could not sign in";
            remorse.execute(e instanceof Error ? e.message : "");
        }
    });

    settingsItem.clicked.connect(() => {
        window.pageStack.push("../pages/SettingsPage/SettingsPage.qml");
    })
}