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

apiRouter.post("/register",
    async ({ body, res, next }) => {
        try {
            await userRepository.createUser(body)
            res.status(201).json("User was created.")
        } catch (error) {
            next(error);
        }
    });

apiRouter.post("/login",
    async ({ body, res, next }) => {
        try {
            const isAuthenticated = await userRepository.authenticateUser(body)
            if (isAuthenticated) {
                const tokenPayload = {
                    user: body.user
                }
                const token = jwt.sign(tokenPayload, process.env.SECRET, {
                    expiresIn: 300 // expires in 5min
                });
                await userRepository.saveUserToken(body.user, token)
                res.status(200).json({ auth: true, token: token })
            } else {
                res.status(401).json("User was not authenticated.")
            }
        } catch (error) {
            next(error);
        }
    });

module.exports = apiRouter;