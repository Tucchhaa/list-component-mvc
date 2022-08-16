const CLASS = {
    content: "content"
}

export class Item {
    readonly element: Selector;
    
    constructor(item: Selector) {
        this.element = item;
    }

    clickDelete(t: TestController) {
        return t.click(this.element.find("button").withText("delete"))
    }

    async getText() {
        return await this.element.find(`.${CLASS.content}`).innerText;
    }
}