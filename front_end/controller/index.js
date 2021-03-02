"use strict"

import { homeView } from "./home.js"

const inMemoryVariables = {
    user: "",
    token: ""
}

async function loadHomeView(user, token) {
    inMemoryVariables.token = (token) ? token : ""
    inMemoryVariables.user = (user) ? user : "visitante"

    const homeViewHTML = await homeView.getHomeView()
    homeViewHTML.querySelector("#greetingsUser").innerText = inMemoryVariables.user

    if (inMemoryVariables.token) {
        homeViewHTML.querySelector("#btnLogin").hidden = true
        homeViewHTML.querySelector("#btnRegister").hidden = true
        homeViewHTML.querySelector("#btnLogout").hidden = false
        homeViewHTML.querySelector("#btnListUsers").hidden = false
    }

    document.getElementById("app").innerHTML = ""
    document.getElementById("app").appendChild(homeViewHTML)
}

loadHomeView()

export const app = {
    inMemoryVariables: inMemoryVariables,
    loadHomeView: loadHomeView
}
