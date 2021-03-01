/**
 * @description Repository of functions that interact with the database and perform CRUD operations for the User model
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const mysql = require("mysql");
const User = require("../model/user.js");

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
    const user = new User(data);
    console.log(user)
    const query = "INSERT INTO user SET ?";
    const result = await executeQuery(query, user);

    return JSON.parse(result);
}

exports.userRepository = {
    getAllUsers: getAllUsers,
    createUser: createUser,
};