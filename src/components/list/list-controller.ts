import { Item } from "../../types";
import { ListModel } from "./list-model";
import { ListView } from "./list-view";

export class ListController {
    model: ListModel;
    
    constructor(model: ListModel, view: ListView) {
        this.model = model; 

        view.on("item-clicked", ({item, event}: { item: Item, event: MouseEvent }) => this.selectItem(item, event));
        
        view.on("edit-btn-clicked", (item: Item) => this.openEditingInput(item));
        view.on("delete-btn-clicked", (item: Item) => this.deleteItem(item));
        
        view.on("save-btn-clicked", (item: Item) => this.saveItem(item));
        view.on("cancel-btn-clicked", (item: Item) => this.cancelEditing(item));
    }

    private selectItem(item: Item, event: MouseEvent) {
        const targetTag = (event.target as HTMLElement).tagName;

        if(targetTag === "BUTTON" || item.editing === true)
            return;

        item.selected = !(item.selected);

        this.model.editItem(item);
    }

    private openEditingInput(item: Item) {
        item.editing = true;
        this.model.editItem(item);
    }

    private deleteItem(item: Item) {
        this.model.deleteItem(item.id)
    }

    private saveItem(item: Item) {
        item.content = item.input!.value;
        item.editing = false;
        
        this.model.editItem(item);
    }

    private cancelEditing(item: Item) {
        item.editing = false;
        this.model.editItem(item);
    }
}