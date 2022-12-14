import { Item } from "../types";
import { IListModel } from "../models/list-model";
import { IView } from "../views/base-view";

export class ListController {
    private model: IListModel;
    
    constructor(model: IListModel, view: IView) {
        this.model = model; 

        view.on("item-clicked", (item: Item) => this.selectItem(item));
        
        view.on("edit-btn-clicked", (item: Item) => this.openEditingInput(item));
        view.on("delete-btn-clicked", (item: Item) => this.deleteItem(item));
        
        view.on("save-btn-clicked", (item: Item) => this.saveItem(item));
        view.on("cancel-btn-clicked", (item: Item) => this.cancelEditing(item));
    }

    private selectItem(item: Item) {
        item.selected = !(item.selected);

        this.model.editItem(item);
    }

    private openEditingInput(item: Item) {
        this.model.editItem({ ...item, editing: true });
    }

    private deleteItem(item: Item) {
        this.model.deleteItem(item.id)
    }

    private saveItem(item: Item) {
        const editedItem = {
            ...item,
            content: item.input!.value,
            editing: false
        }

        this.model.editItem(editedItem);
    }

    private cancelEditing(item: Item) {
        this.model.editItem({ ...item, editing: false });
    }
}