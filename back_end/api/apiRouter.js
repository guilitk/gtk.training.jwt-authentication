/**
 * @description Routed api
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

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

// personRouter.get("/:id",
//     async ({params, res}) => {
//         try {
//             const result = await personRepository.getPersonById(params.id);
//             res.status(200).json(result);
//         } catch (error) {
//             switch (error.status) {
//                 case 404:
//                     res.status(404).json({
//                         message: "Person was not found"
//                     });
//                     break;

//                 default:
//                     res.status(500).json({
//                         message: "Unknown error"
//                     });
//                     break;
//             }
//         }
//     });

apiRouter.post("/",
    async ({ body, protocol, headers, originalUrl, res, next }) => {
        try {
            const tokenPayload = {
                username: body.user,
                id: 1
            }
            const token = jwt.sign(tokenPayload, process.env.SECRET, {
                expiresIn: 600 // expires in 5min
            });
            console.log(token)
            // const result = await personRepository.createPerson(body);
            // result.endpoint = `${protocol}://${headers.host}${originalUrl}${result.person.id}`;
            res.status(201).json({ auth: true, token: token })
        } catch (error) {
            next(error);
        }
    });

// personRouter.delete("/:id",
//     async ({params, res, next}) => {
//         try {
//             await personRepository.deletePerson(params.id);
//             res.status(204).send();
//         } catch (error) {
//             next(error);
//         }
//     });

// personRouter.put("/:id",
//     async ({params, body, res, next}) => {
//         try {
//             await personRepository.updatePerson(body, params.id);
//             res.status(204).send();
//         } catch (error) {
//             next(error);
//         }
//     });

module.exports = apiRouter;