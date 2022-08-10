export type InputOptions = {
    name: string,
    placeholder: string,
    buttonContent: string
}

export type ClassNames = {
    list: string;

    inputsWrapper: string;

    item: string;
    itemWrapper: string,
    itemCheckbox: string,
    itemContent: string,
    itemContentContainer: string,

    buttonsContainer: string,
    deleteBtn: string,
    editBtn: string,

    editingButtonsContainer: string,
    saveBtn: string,
    cancelBtn: string,

    inputWrapper: string,
    inputContainer: string,
    input: string,
    submitButtonContainer: string,
    submitButton: string
}

export type ListComponentOptions = {
    classNames: ClassNames,
    
    inputs: {
        addItem: InputOptions,
        filterItems: InputOptions
    },

    contents: {
        deleteBtn: string,
        editBtn: string,
        saveBtn: string,
        cancelBtn: string
    }
}

export type Id = number;

export type Item = {
    id: Id;
    content: string;

    filtered?: boolean;
    editing?: boolean;
    selected?: boolean;

    input?: HTMLInputElement
}

export type TagNames = "ul" | "div" | "li" | "input" | "button" | "span";