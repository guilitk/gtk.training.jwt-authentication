"use strict"

import { loginView } from "./login.js"
import { registerView } from "./register.js"

async function getHomeView() {
    const strHomeView = await (await fetch("/front_end/view/home.html")).text()
    const parser = new DOMParser()
    const homeViewHTML = parser.parseFromString(strHomeView, "text/html").body

    addPageEvents(homeViewHTML)

    return homeViewHTML
}

function addPageEvents(page) {
    const btnLogin = page.querySelector("#btnLogin")
    const btnRegister = page.querySelector("#btnRegister")

    btnLogin.onclick = loadLoginView
    btnRegister.onclick = loadRegisterView
}

async function loadLoginView() {
    const loginViewHTML = await loginView.getLoginView()
    document.getElementById("app").innerHTML = ""
    document.getElementById("app").appendChild(loginViewHTML)
}

async function loadRegisterView() {
    const registerViewHTML = await registerView.getRegisterView()
    document.getElementById("app").innerHTML = ""
    document.getElementById("app").appendChild(registerViewHTML)
}

export const homeView = {
    getHomeView: getHomeView
}