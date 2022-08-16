import { ListModel } from "../src/models/list-model";

declare var test: jest.It;

const list = [{ id: 0, content: 'a' }, { id: 1, content: 'b' }];

let model: ListModel;
let eventCalled: boolean;

beforeEach(() => {
    model = new ListModel(list.slice());
    eventCalled = false;
});

// Tests

test("return list", () => {
    expect(model.getItems()).toEqual(list);
});

test("add item", () => {
    model.on("item-added", () => { eventCalled = true });

    model.addItem("test");
    
    expect(model.getItems()).toEqual([...list, { id: 2, content: "test" }]);
    expect(eventCalled).toBeTruthy();
});

test("delete unexisting items", () => {
    model.on("item-deleted", () => { eventCalled = true });

    model.deleteItem(54);
    model.deleteItem(2);
    model.deleteItem(-2);

    expect(model.getItems()).toHaveLength(2);
    expect(eventCalled).toBeFalsy();
});

test("delete existing item", () => {
    model.on("item-deleted", () => { eventCalled = true });

    model.deleteItem(0);

    expect(model.getItems()).toHaveLength(1);
    expect(eventCalled).toBeTruthy();
});

test("edit unexisting item", () => {
    model.on("item-edited", () => { eventCalled = true });

    model.editItem({ id: 3, content: "hello" });

    expect(model.getItems()).toEqual(list);
    expect(eventCalled).toBeFalsy();
});

test("edit item", () => {
    model.on("item-edited", () => { eventCalled = true });

    model.editItem({ id: 1, content: "hello" });

    expect(model.getItems()).toContainEqual({ id: 1, content: "hello" });
    expect(model.getItems()).toHaveLength(2);
    expect(eventCalled).toBeTruthy();
});

test("filter items", () => {
    model.on("list-filtered", () => { eventCalled = true });

    // no filter
    model.filterItems("a");
    
    expect(model.getItems()).toContainEqual({ id: 0, content: 'a', filtered: true });
    expect(model.getItems()).toContainEqual({ id: 1, content: 'b', filtered: false });

    expect(eventCalled).toBeTruthy();
});

test("filter items with empty filter", () => {
    model.on("list-filtered", () => { eventCalled = true });

    // no filter
    model.filterItems("");
    model.getItems().forEach(item => expect(item.filtered).toBeTruthy());
    expect(eventCalled).toBeTruthy();
});