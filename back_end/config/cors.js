/**
 * @description Configuration of the CORS policy
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const cors = require("cors");
const corsOptions = {
    "origin": "*",
    "allowedHeaders": "Content-Type",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
};

module.exports = cors(corsOptions);