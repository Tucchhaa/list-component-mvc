import { Item } from "./item";

const CLASS = {
    list: "list",
    item: "list-group-item"
};

export class List {
    readonly element: Selector;

    readonly items: Selector;
    
    constructor(listComponent: Selector) {
        this.element = listComponent.find(`.${CLASS.list}`);

        this.items = this.element.find(`.${CLASS.item}`);
    }

    countItems() {
        return this.items.child().count;
    }

    getItem(index: number) {
        return new Item(this.items.nth(index));
    }

    getItemWithText(text: string) {
        return this.items.withText(text);
    }
}