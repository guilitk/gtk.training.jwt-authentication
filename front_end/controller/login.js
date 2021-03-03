"use strict"

import { app } from "./index.js"

async function login(event) {
    event.preventDefault()

    const user = event.target.user.value
    const password = event.target.password.value

    const url = "http://localhost:3000/api/login";
    const params = {
        method: "post",
        credentials: "include",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ user, password })
    };

    const response = await fetch(url, params)

    if (response.status === 200) {
        const { token } = await response.json()
        app.loadHomeView(user, token)
    } else {
        console.log(await response.json())
    }
}

async function getLoginView() {
    const strLoginView = await (await fetch("/front_end/view/login.html")).text()
    const parser = new DOMParser()
    const loginViewHTML = parser.parseFromString(strLoginView, "text/html").body

    addPageEvents(loginViewHTML)

    return loginViewHTML
}

function addPageEvents(page) {
    const form = page.querySelector("#loginForm")
    form.onsubmit = login
}

export const loginView = {
    getLoginView: getLoginView
}
