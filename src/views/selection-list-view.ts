import { IListModel } from "../models/list-model";
import { ClassNames, Item, ListComponentOptions } from "../types";
import { BaseView } from "./base-view";

export class SelectionListView extends BaseView {
    private model: IListModel;
    private options: ListComponentOptions;
    
    private classNames: ClassNames;

    private list: Item[];

    constructor(model: IListModel, container: HTMLElement, options: ListComponentOptions) {
        super(container);

        this.model = model;
        this.options = options;

        this.classNames = options.classNames;

        this.list = [];

        this.render();

        // model listeners
        model.onMany(["item-added", "item-deleted", "item-edited", "list-filtered"], () => this.render());
    }

    public display(fragment: DocumentFragment): void {
        this.list = this.model.getItems();
        
        const selectionList = this.renderSelectionList();

        fragment.appendChild(selectionList);
    }
    
    private renderSelectionList() {
        const selectedList = this.createDOMNode("ul", "list-group");
        
        for(const item of this.list) {
            if(item.selected) {
                const selected = this.createDOMNode("li", "list-group-item", item.content);

                selectedList.appendChild(selected);
            }
        }

        return selectedList;
    }
}