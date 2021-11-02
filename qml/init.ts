declare let module: any;
declare let exports: any;

const timers: string[] = [];

const directories = [
    "",
    "api/",
    "api/client/",
    "api/client/http/",
    "api/client/socket/",
    "api/client/socket/handlers/",
    "api/structures/",
    "api/structures/dto/",
    "api/structures/dto/events/",
    "cover/",
    "pages/",
    "store/",
] as const;

function require(url: string) {
    const generatedPaths = [
        ...directories.map(dir => "./" + dir + url + ".js"),
        ...directories.map(dir => "./" + dir + url + "/index.js"),
    ];
    for (const modulePath of generatedPaths) {
        const result = Qt.include(modulePath);

        if(result.status === 0) {
            console.log(`Loaded module "${modulePath}"`);

            return exports;
        } else if (result.status !== 2) {
            // @ts-ignore
            console.log(`Could not load module "${modulePath}", error code ${result.status}. ${result.exception}`);
        }
    }

    console.log(`Could not load module "${url}"`);
    throw new Error(`Could not load module "${url}"`);
}

function handleReady() {
    Object.defineProperty(module, "exports", {
        get() { return exports; },
        set(v) {
            exports = v;
        },
    });

    Qt.include("./initStore.js");

    window.client.on('debug', console.log);
    window.client.on('error', console.log);

    const firstPage = Qt.createComponent("./pages/DirectMessagesPage.qml") as Qml.Page;
    window.initialPage = firstPage;
    window.pageStack.push(firstPage);
 
    const coverPage = Qt.createComponent("./pages/CoverPage.qml") as Qml.Page;
    window.cover = coverPage;
}