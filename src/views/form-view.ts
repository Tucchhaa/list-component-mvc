import { ListModel } from "../models/list-model";
import { ClassNames, InputOptions, ListComponentOptions } from "../types";
import { BaseView } from "./base-view";

export class FormView extends BaseView {
    model: ListModel;
    options: ListComponentOptions;
    
    classNames: ClassNames;

    constructor(model: ListModel, container: HTMLElement, options: ListComponentOptions) {
        super(container);

        this.model = model;
        this.options = options;

        this.classNames = options.classNames;

        this.render();
    }

    public display(fragment: DocumentFragment): void {
        const inputs = this.renderInputs();
        
        fragment.appendChild(inputs);
    }

    private renderInputs() {
        const addItemInput = this.renderInput(this.options.inputs.addItem, "add-item-btn-clicked");
        const filterItemInput = this.renderInput(this.options.inputs.filterItems, "filter-items-btn-clicked");

        const wrapper =  this.createContainer(this.classNames.inputs, [addItemInput, filterItemInput]);
        
        return this.createContainer(this.classNames.inputWrapper, [wrapper]);
    }

    private renderInput(inputOptions: InputOptions, btnClickedEvent: string) {
        const { classNames } = this;

        // Render input
        const input = <HTMLInputElement>this.createDOMNode("input", classNames.input);
        input.setAttribute("name", inputOptions.name);
        input.setAttribute("placeholder", inputOptions.placeholder);

        const inputContainer = this.createContainer(classNames.inputContainer, [input]);

        // Render button
        const button = this.createDOMNode("button", classNames.submitButton, inputOptions.buttonContent);

        const buttonContainer = this.createContainer(classNames.submitButtonContainer, [button]);
        
        button.addEventListener("click", () => this.emit(btnClickedEvent, input));

        return this.createContainer(classNames.inputWrapper, [inputContainer, buttonContainer]);
    }
}