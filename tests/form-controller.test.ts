import { EventEmitter, IEventEmitter } from "../src/event-emitter";
import { IListModel } from "../src/models/list-model";
import { FormController } from "../src/controllers/form-controller";
import { Item } from "../src/types";
import { IView } from "../src/views/base-view";


class MockModel implements IListModel {
    public addedItems: string[] = [];
    public filters: string[] = [];

    addItem(content: string): void {
        this.addedItems.push(content)
    }
    filterItems(filter: string): void {
        this.filters.push(filter);
    }

    getItems(): Item[] {
        throw new Error("Method not implemented.");
    }

    deleteItem(id: number): void { }
    editItem(edited: Item): void { }
    on(event: string, listener: CallableFunction): IEventEmitter {
        throw new Error("Method not implemented.");
    }
    onMany(events: string[], listener: CallableFunction): IEventEmitter {
        throw new Error("Method not implemented.");
    }
    emit(event: string, param?: object | undefined): void { }
}

class MockView extends EventEmitter implements IView {
    public registeredEvents: string[] = [];
    
    public on(event: string, listener: CallableFunction): EventEmitter {
        super.on(event, listener);

        this.registeredEvents.push(event);

        return this;
    }

    public display(fragment: DocumentFragment): void { }
}

// ===

let model: MockModel, view: MockView, controller: FormController;

beforeEach(() => {
    model = new MockModel();
    view = new MockView();
    controller = new FormController(model, view);
})

describe("without jest", () => {
    test("subscribing controller listeners to view", () => {
        expect(view.registeredEvents).toEqual(["add-item-btn-clicked", "filter-items-btn-clicked"]);
    });
    
    test("add item", () => {
        view.emit("add-item-btn-clicked", "test item");
        view.emit("add-item-btn-clicked", "test item 1");
    
        expect(model.addedItems).toEqual(["test item", "test item 1"]);
    });
    
    test("filter items", () => {
        view.emit("filter-items-btn-clicked", "filter 1");
        view.emit("filter-items-btn-clicked", "filter 2");
    
        expect(model.filters).toEqual(["filter 1", "filter 2"]);
    });
});

// ===

describe("with jest", () => {
    // const mockSubscribeEvent = jest.fn(view.on);
    // const mockAddItem = jest.fn((content: string) => model.addItem(content));
    // const mockFilterItems = jest.fn((filter: string) => model.filterItems(filter));
    

    test("subscribing controller listeners to view", () => {
        const spy = jest.spyOn(view, "on");

        controller = new FormController(model, view);
        
        const received = spy.mock.calls.map(args => args[0]);
        const expected = ["add-item-btn-clicked", "filter-items-btn-clicked"];

        expect(received).toEqual(expected);
    });
    
    test("add item", () => {
        const spy = jest.spyOn(model, "addItem");

        view.emit("add-item-btn-clicked", "test item");
        view.emit("add-item-btn-clicked", "test item 1");
    
        const received = spy.mock.calls.map(args => args[0]);
        const expected = ["test item", "test item 1"];

        expect(received).toEqual(expected);
    });
    
    test("filter items", () => {
        const spy = jest.spyOn(model, "filterItems");

        view.emit("filter-items-btn-clicked", "filter 1");
        view.emit("filter-items-btn-clicked", "filter 2");
        
        const received = spy.mock.calls.map(args => args[0]);
        const expected = ["filter 1", "filter 2"];

        expect(received).toEqual(expected);
    });
});