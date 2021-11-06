import { Account, Settings } from "store/Settings";

export const AccountManager = {
    getAll() {
        return Settings.get("accounts");
    },

    get(id: number) {
        return Settings.get("accounts").filter(a => a.id == id)[0];
    },

    remove(id: number) {
        const accounts = Settings.get("accounts");
        Settings.set("accounts", accounts.filter(a => a.id != id));
    },

    update(account: Account) {
        const accounts = Settings.get("accounts");
        Settings.set("accounts", accounts.map(a => a.id === account.id || a.token === account.token ? account : a));
    },
    
    makeDefault(id: number) {
        const accounts = Settings.get("accounts");
        Settings.set("accounts", accounts.map(a => ({ ...a, isDefault: a.id === id })));
    },
    
    connect(id: number) {
        const account = this.get(id);
        account && window.client.login(account);
    },
    
    connectDefault() {
        const defaultAccount = Settings.get("accounts").filter(a => a.isDefault)[0]
        if (defaultAccount) {
            window.client.login(defaultAccount)
        } else {
            throw new Error("No default account was set");
        }
    }
}