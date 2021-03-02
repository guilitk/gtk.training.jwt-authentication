"use strict"

const bcrypt = require("bcrypt")

async function hashPassword(password) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

async function validatePassword(password, hash) {
    return await bcrypt.compare(password, hash)
}

exports.hashUtils = {
    hashPassword: hashPassword,
    validatePassword: validatePassword
}
