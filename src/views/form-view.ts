import { IListModel } from "../models/list-model";
import { ClassNames, InputOptions, ListComponentOptions } from "../types";
import { BaseView } from "./base-view";

export class FormView extends BaseView {
    private model: IListModel;
    private options: ListComponentOptions;
    
    private classNames: ClassNames;

    constructor(model: IListModel, container: HTMLElement, options: ListComponentOptions) {
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
        const addItemInput = this.renderInput(this.options.inputs.addItem, 
            (input: HTMLInputElement) => {
                this.emit("add-item-btn-clicked", input.value);
                input.value = "";
            }
        );

        const filterItemInput = this.renderInput(this.options.inputs.filterItems, 
            (input: HTMLInputElement) =>
                this.emit("filter-items-btn-clicked", input.value)
        );
        
        return this.createContainer(this.classNames.inputsWrapper, [addItemInput, filterItemInput]);
    }

    private renderInput(inputOptions: InputOptions, onSubmit: CallableFunction) {
        const { classNames } = this;

        // Render input
        const input = <HTMLInputElement>this.createDOMNode("input", classNames.input);
        input.setAttribute("name", inputOptions.name);
        input.setAttribute("placeholder", inputOptions.placeholder);

        const inputContainer = this.createContainer(classNames.inputContainer, [input]);

        // Render button
        const button = this.createDOMNode("button", classNames.submitButton, inputOptions.buttonContent);

        const buttonContainer = this.createContainer(classNames.submitButtonContainer, [button]);
        
        button.addEventListener("click", () => onSubmit(input));

        return this.createContainer(classNames.inputWrapper, [inputContainer, buttonContainer]);
    }
}