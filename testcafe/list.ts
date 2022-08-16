import * as path from "path";
import { ClientFunction, Selector } from 'testcafe';
import { ListComponent } from './POM/list-component';

fixture`Getting Started`
    .page`file://${path.join(__dirname, "./test.html")}`;

//

const createListComponent = ClientFunction(() => createListComponent());

test
    .before(() => createListComponent())
    ('add item', async t => {
        const listComponent = new ListComponent("#container");

        const { list, form } = listComponent;
        const { addItemInput, addItemBtn } = form;

        const newItemText = "Hello";

        await t
            .typeText(addItemInput, newItemText)
            .click(addItemBtn)
            .expect(list.element.withText(newItemText).exists).ok();
    });

test
    .before(() => createListComponent())
    ('delete item', async t => {
        const listComponent = new ListComponent("#container");

        const { list } = listComponent;
        
        await t.expect(list.countItems()).eql(6);
        
        let item = list.getItem(2), text: string = await item.getText();

        await item.clickDelete(t)
            .expect(list.countItems()).eql(5)
            .expect(list.getItemWithText(text).exists).notOk();

        //

        item = list.getItem(4); 
        text = await item.getText();
        
        await item.clickDelete(t)
            .expect(list.countItems()).eql(4)
            .expect(list.getItemWithText(text).exists).notOk();
    });