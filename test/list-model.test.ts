import { ListModel } from "../src/models/list-model";

const list = [{ id: 0, content: 'a' }, { id: 1, content: 'b' }];

const createModel = () => new ListModel(list.slice());

// Tests

test("return list", () => {    
    const model = createModel();

    expect(model.getItems()).toEqual(list);
});

test("add item", () => {
    const model = createModel();

    let eventCalled = false;
    model.on("item-added", () => { eventCalled = true });

    model.addItem("test");
    
    expect(model.getItems()).toEqual([...list, { id: 2, content: "test" }]);
    expect(eventCalled).toBeTruthy();
});

test("delete unexisting items", () => {
    const model = createModel();

    let eventCalled = false;
    model.on("item-deleted", () => { eventCalled = true });

    model.deleteItem(54);
    model.deleteItem(2);
    model.deleteItem(-2);

    expect(model.getItems()).toHaveLength(2);
    expect(eventCalled).toBeFalsy();
});

test("delete existing item", () => {
    const model = createModel();

    let eventCalled = false;
    model.on("item-deleted", () => { eventCalled = true });

    model.deleteItem(0);

    expect(model.getItems()).toHaveLength(1);
    expect(eventCalled).toBeTruthy();
});

test("edit unexisting item", () => {
    const model = createModel();

    let eventCalled = false;
    model.on("item-edited", () => { eventCalled = true });

    model.editItem({ id: 3, content: "hello" });

    expect(model.getItems()).toEqual(list);
    expect(eventCalled).toBeFalsy();
});

test("edit item", () => {
    const model = createModel();

    let eventCalled = false;
    model.on("item-edited", () => { eventCalled = true });

    model.editItem({ id: 1, content: "hello" });

    expect(model.getItems()).toContainEqual({ id: 1, content: "hello" });
    expect(model.getItems()).toHaveLength(2);
    expect(eventCalled).toBeTruthy();
});

test("filter items", () => {
    const model = createModel();

    let eventCalled = false;
    model.on("list-filtered", () => { eventCalled = true });

    // no filter
    model.filterItems("a");
    
    expect(model.getItems()).toContainEqual({ id: 0, content: 'a', filtered: true });
    expect(model.getItems()).toContainEqual({ id: 1, content: 'b', filtered: false });

    expect(eventCalled).toBeTruthy();
});

test("filter items with empty filter", () => {
    const model = createModel();

    let eventCalled = false;
    model.on("list-filtered", () => { eventCalled = true });

    // no filter
    model.filterItems("");
    model.getItems().forEach(item => {
        expect(item.filtered).toBeTruthy();
    });
    expect(eventCalled).toBeTruthy();
});