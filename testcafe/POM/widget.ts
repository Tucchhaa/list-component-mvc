import { Selector } from "testcafe";

export abstract class Widget {
    public element: Selector;

    constructor(id: string | Selector) {
        this.element = typeof id === "string" ? Selector(id) : id;
    }
}