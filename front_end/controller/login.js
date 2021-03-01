"use strict"

async function login(event) {
    event.preventDefault()

    const user = "zebu"
    const password = "zebu1234"

    const url = "http://localhost:3000/api/";
    const params = {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ user, password })
    };

    const response = await fetch(url, params)
    const { token } = await response.json()

    console.log(token)
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
