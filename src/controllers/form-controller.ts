import { IListModel } from "../models/list-model";
import { IView } from "../views/base-view";

export class FormController {
    private model: IListModel;
    
    constructor(model: IListModel, view: IView) {
        this.model = model; 

        view.on("add-item-btn-clicked", (value: string) => this.addItem(value));
        view.on("filter-items-btn-clicked", (value: string) => this.filterItems(value));
    }

    private addItem(value: string) {
        if(value.trim().length === 0) 
            return;

        this.model.addItem(value);
    }

    private filterItems(value: string) {
        const filter = value.trim().toLowerCase();

        this.model.filterItems(filter);
    }
}