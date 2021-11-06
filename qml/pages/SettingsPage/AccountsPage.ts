import { AccountManager } from "api/client/AccountManager";
import { Account } from "store/Settings";

declare const addItem: Qml.MenuItem;
declare const listModel: Qml.ListModel<Account & { account_id: number }>;

function handleReady() {
    addItem.clicked.connect(() => {
        const dialog = window.pageStack.push("./NewAccountPage.qml") as Qml.Dialog;
        dialog.accepted.connect(updateAccountList);
    });
    window.client.on("ready", updateAccountList);
    window.client.on("disconnect", updateAccountList);
    updateAccountList();
}

function updateAccountList() {
    const accounts = AccountManager.getAll();
    listModel.clear();
    accounts.forEach(account => {
        listModel.append({
            ...account,
            account_id: account.id
        });
    });
}

function removeAccount(id: number) {
    AccountManager.remove(id);
    updateAccountList();
}

function makeDefaultAccount(id: number) {
    AccountManager.makeDefault(id);
    updateAccountList();
}

function connectAccount(id: number) {
    AccountManager.connect(id);
    updateAccountList();
}