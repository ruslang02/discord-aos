export const defaultSettings: Settings = {
    accounts: [], 
    debug: false,
    autoConnect: false,
    gatewayUrl: "wss://gateway.discord.gg/?v=9&encoding=json"
};

export interface Account {
    id: number
    token: string
    isDefault: boolean
    avatar?: string
    username?: string
    discriminator?: string
}

export interface Settings {
    accounts: Account[]
    gatewayUrl: string
    debug: boolean
    autoConnect: boolean
};

export const Settings = {
    get<K extends keyof Settings>(key: K): Settings[K] {
        const defaultValue = defaultSettings[key];
        const type = typeof defaultValue;
        const value = window.store.get("settings")[key];

        if (!value && type === "string") return defaultValue;

        return value ?? defaultValue;
    },
    set<K extends keyof Settings>(key: K, value: Settings[K]) {
        window.store.fetch("settings", settings => {
            settings[key] = value;
            window.store.set("settings", settings);
        });
    },
};