"use strict"

import { homeView } from "./home.js"

async function register(event) {
    event.preventDefault()

    const user = event.target.user.value
    const name = event.target.name.value
    const password = event.target.password.value

    const url = "http://localhost:3000/api/register";
    const params = {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ user, name, password })
    };

    try {
        const response = await fetch(url, params)

        if (response.status === 201) {
            await processSuccessfulRegister()
        }
    } catch (error) {
        console.log(error)
    }

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

async function processSuccessfulRegister() {
    document.querySelector("#registerForm").hidden = true
    document.querySelector("#txtSuccessRegister").hidden = false

    setTimeout(async () => await homeView.loadLoginView(), 1000)
}

export const registerView = {
    getRegisterView: getRegisterView
}