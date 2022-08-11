import { EventEmitter, IEventEmitter } from "../event-emitter";

import { Item, Id } from "../types";

export interface IListModel extends IEventEmitter {
    getItems(): Item[];
    addItem(content: string): void;
    deleteItem(id: Id): void;
    editItem(edited: Item): void;
    filterItems(filter: string): void;
}

// ===

export class ListModel extends EventEmitter implements IListModel {
    private list: Item[];
    
    constructor(list: Item[]) {
        super();
        
        this.list = list;
    }

    public getItems() {
        return this.list.slice();
    }

    public addItem(content: string) {
        const id = this.list[this.list.length-1]?.id + 1 || 1;

        const item = { id, content };

        this.list.push(item);

        this.emit("item-added", item);
    }

    public deleteItem(id: Id) {
        const index = this.list.findIndex(item => item.id === id);

        if(index !== -1) {
            const item = this.list.splice(index, 1)[0];
        
            this.emit("item-deleted", item);
        }
    }

    public editItem(edited: Item) {
        for(let i=0; i < this.list.length; i++) {
            let item = this.list[i];

            if(item.id === edited.id) {
                this.list[i] = { ...item, ...edited };
                
                this.emit("item-edited", item);

                return;
            }
        }
    }
    
    public filterItems(filter: string) {
        for(const item of this.list) {
            item.filtered = item.content.indexOf(filter) !== -1;
        }

        this.emit("list-filtered");
    }
}