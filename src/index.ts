import { ListComponent } from "./components/list/list-component";
import { Item } from "./types";

window.addEventListener("load", () => {
    const list: Item[] = [
        { id: 0, content: "Berlin" },
        { id: 1, content: "Pekin" },
        { id: 2, content: "Bishkek" },
        { id: 3, content: "Washington" },
        { id: 4, content: "Paris" },
        { id: 5, content: "New Deli" },
    ];

    const container = document.getElementById("container");

    new ListComponent(list, container!);
});