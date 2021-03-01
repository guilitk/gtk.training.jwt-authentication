"use strict"

async function register(event) {
    event.preventDefault()

    const user = event.target.user.value
    const name = event.target.name.value
    const password = event.target.password.value

    const url = "http://localhost:3000/api/user";
    const params = {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ user, name, password })
    };

    const response = await fetch(url, params)
    const jsonResponse = await response.json()

    console.log(jsonResponse)
}

async function getRegisterView() {
    const strRegisterView = await (await fetch("/front_end/view/register.html")).text()
    const parser = new DOMParser()
    const registerViewHTML = parser.parseFromString(strRegisterView, "text/html").body

    addPageEvents(registerViewHTML)

    return registerViewHTML
}

function addPageEvents(page) {
    const form = page.querySelector("#registerForm")
    form.onsubmit = register
}

export const registerView = {
    getRegisterView: getRegisterView
}