const CLASS = {
    form: "form",
    inputWrapper: "input-wrapper"
};

export class Form {
    readonly element: Selector; 
    
    readonly addItemInput: Selector;
    readonly addItemBtn: Selector;

    readonly filterItemsInput: Selector;
    readonly filterItemsBtn: Selector;

    constructor(listComponent: Selector) {
        this.element = listComponent.find(`.${CLASS.form}`)
    
        const inputs = this.element.find(`.${CLASS.inputWrapper}`);

        const addItem = inputs.child(0);
        this.addItemInput = addItem.find("input");
        this.addItemBtn = addItem.find("button");
        
        const filterItems = inputs.child(0);
        this.filterItemsInput = filterItems.find("input");
        this.filterItemsBtn = filterItems.find("button");
    }
}