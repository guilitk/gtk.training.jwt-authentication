/**
 * @description Class to model the entity User
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict"

class User {
    constructor({ user, name, password }) {
        this.user = user
        this.name = name
        this.password = password
    }
}

module.exports = User