import { defaultOptions } from "../constants";
import { Item, ListComponentOptions } from "../types";

import { ListController } from "../controllers/list-controller";
import { ListModel } from "../models/list-model";
import { ListView } from "../views/list-view";
import { FormView } from "../views/form-view";
import { FormController } from "../controllers/form-controller";

export class ListComponent {
    model: ListModel;
    options: ListComponentOptions;

    constructor(list: Item[], container: HTMLElement, options?: ListComponentOptions) {
        const _options = { ...defaultOptions, ...options };

        // create HTML container for Views 
        const formContainer = document.createElement("div");
        formContainer.className = _options.classNames.inputsWrapper;
        
        const listContainer = document.createElement("div");
        
        container.append(formContainer, listContainer);
        // ===

        this.model = new ListModel(list);
        this.options = _options;

        // ===
        this.createForm(formContainer);
        this.createList(listContainer);
    }

    private createForm(container: HTMLElement) {
        const view = new FormView(this.model, container, this.options);

        const controller = new FormController(this.model, view);
    }

    private createList(container: HTMLElement) {
        const view = new ListView(this.model, container, this.options);
        
        const controller = new ListController(this.model, view);
    }

    private createSelectedList(container: HTMLElement) {

    }
}