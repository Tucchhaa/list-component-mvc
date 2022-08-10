import { EventEmitter } from "../event-emitter";
import { TagNames } from "../types";

export abstract class BaseView extends EventEmitter {
    public abstract render(): void;

    protected createDOMNode(tagName: TagNames, className = "", innerText = "") {
        const node = document.createElement(tagName);
        node.className = className;
        node.innerText = innerText;

        return node;
    }

    protected createContainer(className: string, children: HTMLElement[]) {
        const container = this.createDOMNode("div", className);

        for(const child of children)
            container.appendChild(child);

        return container;
    }
}