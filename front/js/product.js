import { createArticle } from "./items.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

if (id) {
    createArticle(id);
} else {
    console.log("Error: no id in url");
}
