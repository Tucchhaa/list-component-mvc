import { defaultOptions } from "../constants";
import { Item, ListComponentOptions } from "../types";

import { ListController } from "../controllers/list-controller";
import { IListModel, ListModel } from "../models/list-model";
import { ListView } from "../views/list-view";
import { FormView } from "../views/form-view";
import { FormController } from "../controllers/form-controller";
import { SelectionListView } from "../views/selection-list-view";

export class ListComponent {
    model: IListModel;
    options: ListComponentOptions;

    constructor(list: Item[], container: HTMLElement, options?: ListComponentOptions) {
        const _options = { ...defaultOptions, ...options };
 
        this.model = <IListModel>new ListModel(list);
        this.options = _options;

        // ===
        const formContainer = <HTMLElement|null>container.querySelector(".form");

        const listContainer = <HTMLElement|null>document.querySelector(".list");

        const selectionListContainer = <HTMLElement|null>document.querySelector(".selection-list");
        // ===

        this.createForm(formContainer);
        this.createList(listContainer);
        this.createSelectionList(selectionListContainer);
    }

    private createForm(container: HTMLElement | null) {
        if(container) {
            const view = new FormView(this.model, container, this.options);

            const controller = new FormController(this.model, view);
        }
    }

    private createList(container: HTMLElement | null) {
        if(container) {
            const view = new ListView(this.model, container, this.options);

            const controller = new ListController(this.model, view);
        }
    }

    private createSelectionList(container: HTMLElement | null) {
        if(container) {
            const view = new SelectionListView(this.model, container, this.options);
        }
    }
}