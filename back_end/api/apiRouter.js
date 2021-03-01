/**
 * @description Routed api
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const { userRepository } = require("../repository/userRepository.js")
const { Router } = require("express");
const apiRouter = new Router();
const jwt = require("jsonwebtoken");

apiRouter.get('/',
    async ({ res }) => {
        try {
            res.status(200).json([{ result: "Funcionando!" }]);
        } catch (error) {
            res.status(500).json({
                message: "Unknown error"
            });
        }
    });

// apiRouter.post("/",
//     async ({ body, protocol, headers, originalUrl, res, next }) => {
//         try {
//             const tokenPayload = {
//                 username: body.user,
//                 id: 1
//             }
//             const token = jwt.sign(tokenPayload, process.env.SECRET, {
//                 expiresIn: 600 // expires in 5min
//             });
//             console.log(token)
//             // const result = await personRepository.createPerson(body);
//             // result.endpoint = `${protocol}://${headers.host}${originalUrl}${result.person.id}`;
//             res.status(201).json({ auth: true, token: token })
//         } catch (error) {
//             next(error);
//         }
//     });

apiRouter.post("/user",
    async ({ body, res, next }) => {
        try {
            const result = await userRepository.createUser(body);
            console.log(result)
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    });

module.exports = apiRouter;