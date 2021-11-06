import { Account, Settings } from "store/Settings";

declare const dialog: Qml.Dialog;
declare const tokenField: Qml.TextField;

function handleReady() {
    dialog.accepted.connect(() => {
        const accounts: Account[] = [
            ...Settings.get("accounts"),
            { id: new Date().getTime(), token: tokenField.text, isDefault: false }
        ];
        
        Settings.set("accounts", accounts);
    });
}