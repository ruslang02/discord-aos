import { Client } from "api/client/Client";
import { DatabaseStore } from "store/DatabaseStore";

Object.defineProperty(window, "store", {
    value: new DatabaseStore(),
});
console.log("loading client");
Object.defineProperty(window, "client", {
    value: new Client(),
});
console.log("loaded client");
