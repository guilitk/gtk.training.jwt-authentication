"use strict"

import { app } from "./index.js"

async function populateView(view, users) {


    console.log(users)



}

async function getUsers() {
    let url = "http://localhost:3000/api/users";
    let params = {
        method: "get",
        credentials: "include",
        headers: {
            "x-access-token": app.inMemoryVariables.token
        }
    };

    let response = await fetch(url, params)

    if (response.status === 401) {
        url = "http://localhost:3000/api/refresh_token";
        params = {
            method: "post",
            credentials: "include"
        }

        response = await fetch(url, params)

        if (response.status === 200) {
            const { token } = await response.json()
            app.inMemoryVariables.token = token

            const retryGetUsers = new Error()
            retryGetUsers.name = "RetryGetUsersError"
            throw retryGetUsers
        }
    }

    return await response.json()
}

async function getUsersListView() {
    const strView = await (await fetch("/front_end/view/usersList.html")).text()
    const parser = new DOMParser()
    const htmlView = parser.parseFromString(strView, "text/html").body

    try {
        const users = await getUsers()
        await populateView(htmlView, users)
    } catch (error) {
        if (error.name === "RetryGetUsersError") {
            const users = await getUsers()
            await populateView(htmlView, users)
        }
    }



    return htmlView
}

export const usersListView = {
    getUsersListView: getUsersListView
}