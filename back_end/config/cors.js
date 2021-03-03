/**
 * @description Configuration of the CORS policy
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const cors = require("cors");
const corsOptions = {
    "origin": "http://localhost:5500",
    "credentials": true,
    "allowedHeaders": "Content-Type,x-access-token",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
};

module.exports = cors(corsOptions);