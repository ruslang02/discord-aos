import { Client } from "api/client/Client";
import { DatabaseStore } from "store/DatabaseStore";

Object.defineProperty(window, "store", {
    value: new DatabaseStore(),
});

Object.defineProperty(window, "client", {
    value: new Client(),
});
