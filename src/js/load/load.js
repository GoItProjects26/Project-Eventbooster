import { EventApi } from "../api";

const event = new EventApi;

export async function saveCollectionToLocalStorage() {
    if (localStorage.getItem("event")) {
        return
    }
    const responce = await event.fetchApiData();
    localStorage.setItem("event", JSON.stringify(responce));
}