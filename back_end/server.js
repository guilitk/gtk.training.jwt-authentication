/**
 * @description Server configuration
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict"

const app = require("express")()
const { json } = require("express")

const cors = require("./config/cors")

const apiRouter = require("./api/apiRouter")
const PORT = process.env.PORT

app.use(process.env.API_PATH, json(), cors, apiRouter)

app.listen(PORT)