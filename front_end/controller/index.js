"use strict"

import { homeView } from "./home.js"

async function loadHomeView() {
    const homeViewHTML = await homeView.getHomeView()

    document.getElementById("app").innerHTML = ""
    document.getElementById("app").appendChild(homeViewHTML)
}

loadHomeView()