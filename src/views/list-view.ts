import { ClassNames, Item, ListComponentOptions } from "../types";

import { BaseView } from "./base-view";

import { IListModel } from "../models/list-model";

export class ListView extends BaseView {
    model: IListModel;
    options: ListComponentOptions;

    classNames: ClassNames;
    
    list: Item[];

    constructor(model: IListModel, container: HTMLElement, options: ListComponentOptions) {
        super(container);
        
        this.model = model; 

        this.list = [];

        this.options = options;
        this.classNames = options.classNames;

        // model listeners
        model.onMany(["item-added", "item-deleted", "item-edited", "list-filtered"], () => this.render());
        
        //
        this.render();
    }

    public display(fragment: DocumentFragment): void {
        this.list = this.model.getItems();

        const list = this.renderList();

        fragment.appendChild(list);
    }

    private renderList() {
        const listNode = this.createDOMNode("ul", this.classNames.list);

        for(const item of this.list) {
            if(item.filtered === false)
                continue;

            const itemNode = this.renderItem(item);
            
            listNode.appendChild(itemNode);
        }

        return listNode;
    }

    // Item rendering
    // ===

    private renderItem(item: Item) {
        const itemNode = this.createDOMNode("li", this.classNames.item);
        let children = [];

        // if item is editing
        if(item.editing) {
            const inputContent = this.renderItemInput(item);
            const buttons = this.renderItemEditingButtons(item);

            children = [inputContent, buttons];
        }
        else {
            const content = this.renderItemContent(item);
            const buttons = this.renderItemButtons(item);
            
            children = [content, buttons];
        }
        
        const container = this.createContainer(this.classNames.itemWrapper, children)
        
        // 

        itemNode.appendChild(container);
        
        itemNode.addEventListener("click", event => this.emit("item-clicked", { item, event }));
        
        return itemNode;
    }

    // If item not being edited
    // ===

    private renderItemContent(item: Item) {
        const checkbox = <HTMLInputElement>this.createCheckbox();
        const content = this.createDOMNode("span", this.classNames.itemContent, item.content);

        checkbox.checked = !!item.selected;

        return this.createContainer(this.classNames.itemContentContainer, [checkbox, content]);
    }

    private renderItemButtons(item: Item) {
        const editBtn = this.createDOMNode("button", this.classNames.editBtn, this.options.contents.editBtn);
        const deleteBtn  = this.createDOMNode("button", this.classNames.deleteBtn, this.options.contents.deleteBtn);

        deleteBtn.addEventListener("click", () => this.emit("delete-btn-clicked", item));
        editBtn.addEventListener("click", () => this.emit("edit-btn-clicked", item));
        
        const container = this.createContainer(this.classNames.buttonsContainer, [editBtn, deleteBtn]);

        container.setAttribute("role", "group");
        container.setAttribute("aria-label", "delete and edit buttons");

        return container;
    }

    // if item is being edited
    // ===

    private renderItemInput(item: Item) {
        const input = <HTMLInputElement>this.createDOMNode("input", this.classNames.input);
        input.setAttribute("placeholder", "Item content");
        input.value = item.content;

        item.input = input;

        return this.createContainer("", [input]);
    }

    private renderItemEditingButtons(item: Item) {
        const saveBtn = this.createDOMNode("button", this.classNames.saveBtn, this.options.contents.saveBtn);
        const cancelBtn = this.createDOMNode("button", this.classNames.cancelBtn, this.options.contents.cancelBtn);

        saveBtn.addEventListener("click", () => this.emit("save-btn-clicked", item));
        cancelBtn.addEventListener("click", () => this.emit("cancel-btn-clicked", item));

        return this.createContainer(this.classNames.editingButtonsContainer, [saveBtn, cancelBtn]);
    }

    // ===
    private createCheckbox() {
        const checkbox = this.createDOMNode("input", this.classNames.itemCheckbox);
        checkbox.setAttribute("type", "checkbox");

        return checkbox;
    }
}