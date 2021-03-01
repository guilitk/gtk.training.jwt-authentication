"use strict"

// async function register(event) {
//     event.preventDefault()

//     const user = "zebu"
//     const password = "zebu1234"

//     const url = "http://localhost:3000/api/";
//     const params = {
//         method: "post",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify({ user, password })
//     };

//     const response = await fetch(url, params)
//     const { token } = await response.json()

//     console.log(token)
// }

async function getRegisterView() {
    const strRegisterView = await (await fetch("/front_end/view/register.html")).text()
    const parser = new DOMParser()
    const registerViewHTML = parser.parseFromString(strRegisterView, "text/html").body

    addPageEvents(registerViewHTML)

    return registerViewHTML
}

function addPageEvents(page) {
    const form = page.querySelector("#registerForm")
    //form.onsubmit = register
}

export const registerView = {
    getRegisterView: getRegisterView
}