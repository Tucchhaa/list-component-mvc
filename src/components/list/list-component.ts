import { defaultOptions } from "../../constants";
import { Item, ListComponentOptions } from "../../types";
import { ListController } from "./list-controller";
import { ListModel } from "./list-model";
import { ListView } from "./list-view";

export class ListComponent {
    constructor(list: Item[], container: HTMLElement, options?: ListComponentOptions) {
        const _options = { ...defaultOptions, ...options };

        const model = new ListModel(list);
        const view = new ListView(model, container, _options);
        const controller = new ListController(model, view);
    }
}