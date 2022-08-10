import { EventEmitter } from "../../event-emitter";

import { Item, Id } from "../../types";

export class ListModel extends EventEmitter {
    private list: Item[];
    
    constructor(list: Item[]) {
        super();

        this.list = list;
    }

    public addItem(item: Item) {
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

    public getList() {
        return this.list.slice();
    }

    public editItem(edited: Item) {
        let item = this.list.filter(item => item.id === edited.id);
        
        if(item) {
            item = { ...item, ...edited };
            
            this.emit("item-edited", item);
        }
    }
}