import { Selector } from "testcafe";
import { Widget } from "../widget";
import { Form } from "./form";
import { List } from "./list";
import { SelectionList } from "./selection-list";

export class ListComponent extends Widget {
    readonly list: List;
    readonly form: Form;
    readonly selectionList: SelectionList;

    constructor(id: string | Selector) {
        super(id);

        this.list = new List(this.element);
        this.form = new Form(this.element);
        this.selectionList = new SelectionList(this.element);
    }
}