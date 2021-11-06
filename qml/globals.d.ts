type QSignal<T = void> = {
    disconnect(slot: (arg1: T) => void): void
    connect(slot: (arg1: T) => void): void
};

interface QmlApplicationViewer {
    hide(): void
    show(): void
    showMinimized(): void
}

declare namespace Qt {
    type TransactionResult<T = unknown> = {
        insertId: string
        rowsAffected: number
        rows: {
            length: number
            item(i: number): T
        }
    };
    type Transaction = {
        executeSql<T = unknown>(statement: string, values?: unknown[]): TransactionResult<T>
    };
    type Database = {
        transaction(callback: (tx: Transaction) => void): void
        readTransaction(callback: (tx: Transaction) => void): void
    };
    declare function createComponent(url: string): Qml.Component;
    declare function createQmlObject<T = unknown>(qml: string, parent?: unknown): T;
    declare function formatDateTime(date: Date, format: string): string;
    declare function include(filename: string): { status: number };
    declare function resolvedUrl(url: string): string;
    declare function quit(): void;
}

declare function qsTr(id: string): string;

declare namespace Theme {
    const secondaryColor: string
    const primaryColor: string
}

declare namespace Qml {
    interface Component {
        onCompleted: QSignal
        onDestroyed: QSignal
        createObject(parent: Component): void
    }

    interface Page extends Component {
        pageName: string
    }

    interface InfoBanner {
        iconSource: string
        interactive: boolean
        platformInverted: boolean
        text: string
        timeout: number

        close(): void
        open(): void
    }

    interface Dialog extends Page {
        accept(): void
        close(): void
        open(): void
        reject(): void

        accepted: QSignal
        opened: QSignal
        rejected: QSignal
    }

    interface CommonDialog extends Dialog {
        buttonClicked: QSignal<number>
        titleText: string
    }

    interface Button {
        clicked: QSignal
    }

    interface TextField {
        placeholderText: string
        text: string
    }

    interface TextArea {
        implicitHeightChanged: QSignal
        text: string
        placeholderText: string
    }

    interface TextEdit {
        implicitHeightChanged: QSignal
        text: string
        textChanged: QSignal<string>
    }

    interface PageStack {
        depth: number

        push(page: string | Page | Component | Page[], properties?: Record<string, unknown>, immediate?: boolean): Qml.Page
        pop(): void
    }

    interface Window extends Component {
        width: number
    }

    interface ApplicationWindow extends Window {
        cover: Qml.Page
        initialPage: Qml.Page
        pageStack: PageStack
    }

    interface ListModel<T = unknown> {
        setProperty(index: number, prop: string, value: T): void
        remove(index: number): void
        get(index: number): void
        append(value: T): void
        clear(): void
    }

    interface ListItem {
        clicked: QSignal
    }

    interface SelectionListItem extends ListItem {
        title: string
        subTitle: string
    }

    interface ListView {
        count: number
        positionViewAtIndex(index: number, mode: number): void
    }

    interface Timer {
        interval: number
        repeat: boolean

        start(): void
        restart(): void
        stop(): void

        triggered: QSignal
    }

    interface WebSocket {
        active: boolean
        readonly errorString: string
        readonly status: number // Status
        url: string

        statusChanged: QSignal<number>
        textMessageReceived: QSignal<string>

        sendTextMessage(message: string): void
    }

    interface HapticsEffect {
        running: boolean
    }

    interface Menu {
        open(): void
    }

    interface MenuItem {
        clicked: QSignal
    }

    interface RemorsePopup {
        cancelText: string
        text: string

        execute(text: string, callback?: () => void, timeout?: number): void
        trigger(): void
    }
}

declare namespace LocalStorage {
    declare function openDatabaseSync(
        identifier: string,
        version: string,
        description: string,
        estimatedSize: number,
        callback?: (db: Qt.Database) => void
    ): Database;
}

declare interface Window extends Qml.Component, Qml.ApplicationWindow {
    client: import("./api/client/Client").Client
    store: import("./store/DatabaseStore").DatabaseStore
}

declare const remorse: Qml.RemorsePopup;

const ListView: {
    Beginning: number
    Center: number
    End: number
    Visible: number
    Contain: number
};