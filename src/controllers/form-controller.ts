import { IListModel } from "../models/list-model";
import { IView } from "../views/base-view";

export class FormController {
    model: IListModel;
    
    constructor(model: IListModel, view: IView) {
        this.model = model; 

        view.on("add-item-btn-clicked", (input: HTMLInputElement) => this.addItem(input));
        view.on("filter-items-btn-clicked", (input: HTMLInputElement) => this.filterItems(input));
    }

    private addItem(input: HTMLInputElement) {
        if(input.value.trim().length === 0) 
            return;

        this.model.addItem(input.value);
        
        input.value = "";
    }

    private filterItems(input: HTMLInputElement) {
        const filter = input.value.trim().toLowerCase();

        this.model.filterItems(filter);
    }
}