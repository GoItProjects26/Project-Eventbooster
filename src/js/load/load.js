import { EventApi } from "../api";

export async function saveCollectionToLocalStorage() {
    if (localStorage.getItem("event")) {
        return
    }
    const responce = await EventApi.fetchApiData();
    localStorage.setItem("event", JSON.stringify(responce));
}