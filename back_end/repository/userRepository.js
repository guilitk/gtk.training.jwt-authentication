/**
 * @description Repository of functions that interact with the database and perform CRUD operations for the User model
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const mysql = require("mysql");
const User = require("../model/user.js");
const { hashUtils } = require("../utils/hashUtils.js")

function getConnection() {
    const CONNECTION_SETTINGS = Object.freeze({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    });

    return mysql.createConnection(CONNECTION_SETTINGS);
}

function executeQuery(query, values) {
    return new Promise((resolve, reject) => {
        const connection = getConnection();
        connection.connect();
        connection.query(query, values,
            (err, data) => {
                (err) ? reject(err) : resolve(JSON.stringify(data))
            });
        connection.end();
    });
}

async function getAllUsers() {
    const query = "SELECT * FROM user";
    const result = await executeQuery(query);

    return JSON.parse(result);
}

async function createUser(data) {
    data.password = await hashUtils.hashPassword(data.password)
    const user = new User(data);
    console.log(user)
    const query = "INSERT INTO user SET ?";
    await executeQuery(query, user);
}

async function authenticateUser(data) {
    const userHash = await getUserHash(data.user)

    return await hashUtils.validatePassword(data.password, userHash)
}

async function saveUserToken(user, token) {

    const query = "UPDATE user SET ? WHERE user = ?";
    await executeQuery(query, [{ auth_token: token }, user]);
}

async function getUserHash(username) {
    const query = "SELECT password FROM user WHERE user = ?";
    let result = await executeQuery(query, username);
    result = JSON.parse(result);

    if (result.length === 0) {
        throw { status: 404 };
    }

    return result[0].password;
}

exports.userRepository = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    authenticateUser: authenticateUser,
    saveUserToken: saveUserToken
};