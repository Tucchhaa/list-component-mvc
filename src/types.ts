export type ClassNames = {
    list: string;

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

    contents: {
        deleteBtn: string,
        editBtn: string,
        saveBtn: string,
        cancelBtn: string
    }
}

export type Id = number | string;

export type Item = {
    id: Id;
    content: string;

    editing?: boolean;
    selected?: boolean;

    input?: HTMLInputElement
}

export type TagNames = "ul" | "div" | "li" | "input" | "button" | "span";