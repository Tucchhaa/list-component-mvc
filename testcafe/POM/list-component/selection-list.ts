const CLASS = {
    selectionList: "selection-list"
};

export class SelectionList {
    readonly element: Selector; 
    
    constructor(listComponent: Selector) {
        this.element = listComponent.find(`.${CLASS.selectionList}`)
    }
}