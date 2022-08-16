import { ListComponentOptions } from "./types";

const listClassName = "list-group";

export const defaultOptions: ListComponentOptions = {
    classNames: {
        list: listClassName,

        inputsWrapper: "col-8 input-wrapper",

        item: listClassName + "-item row",
        itemWrapper: "row",
        itemCheckbox: "checkbox",
        itemContent: "content",
        itemContentContainer: "text-left col",

        buttonsContainer: "btn-group col-auto",
        deleteBtn: "btn btn-danger",
        editBtn: "btn btn-warning",

        editingButtonsContainer: "btn-group col-auto margin-top",
        saveBtn: "btn btn-primary",
        cancelBtn: "btn btn-outline-danger",

        inputWrapper: "row margin30px",
        inputContainer: "col",
        input: "form-control",
        submitButtonContainer: "col col-auto",
        submitButton: "btn btn-primary"
    },

    contents: {
        deleteBtn: "delete",
        editBtn: "edit",
        saveBtn: "save",
        cancelBtn: "cancel"
    },

    inputs: {
        addItem: {
            name: "item-content",
            placeholder: "Add item",
            buttonContent: "Add"
        },
        filterItems: {
            name: "item-content",
            placeholder: "Filter items",
            buttonContent: "Filter"
        }
    },
};