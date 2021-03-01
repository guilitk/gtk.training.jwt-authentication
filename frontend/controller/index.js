"use strict"

async function loadLoginPage() {
    const strLoginPage = await (await fetch("/frontend/view/login.html")).text()
    const parser = new DOMParser()
    const loginPageHTML = parser.parseFromString(strLoginPage, "text/html").body.firstElementChild.innerHTML

    console.log(loginPageHTML)

    document.querySelector("app").innerHTML = loginPageHTML
}

loadLoginPage()