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
const uuid = require("uuid")

apiRouter.get('/users',
    async ({ headers, res }) => {
        try {
            const accessToken = headers["x-access-token"]
            jwt.verify(accessToken, process.env.SECRET)
            const result = await userRepository.getAllUsers();
            res.status(200).json(result)
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                res.status(401).json({ auth: false });
            } else {
                res.status(500).json({
                    message: "Unknown error"
                });
            }
        }
    });


apiRouter.post('/refresh_token',
    async ({ cookies, res }) => {
        try {
            const refreshToken = cookies.refresh_token
            const { user } = jwt.verify(refreshToken, process.env.SECRET)
            const userSavedToken = await userRepository.getRefreshToken(user)

            if (userSavedToken === refreshToken) {
                const accessTokenPayload = {
                    user: user,
                    access_token_id: uuid.v4()
                }

                const accessToken = jwt.sign(accessTokenPayload, process.env.SECRET, {
                    expiresIn: 60
                })

                const refreshTokenPayload = {
                    user: user,
                    refresh_token_id: uuid.v4()
                }

                const newRefreshToken = jwt.sign(refreshTokenPayload, process.env.SECRET, {
                    expiresIn: 60 * 60 * 24 * 30
                })

                await userRepository.saveUserToken(user, newRefreshToken)

                res.cookie('refresh_token', newRefreshToken);
                res.status(200).json({ auth: true, token: accessToken })
            } else {
                res.status(401).json({ auth: false, message: "The token was invalid." });
            }
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                res.status(401).json({ auth: false });
            } else {
                res.status(500).json({
                    message: "Unknown error"
                });
            }
        }
    });

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
                const accessTokenPayload = {
                    user: body.user,
                    access_token_id: uuid.v4()
                }

                const accessToken = jwt.sign(accessTokenPayload, process.env.SECRET, {
                    expiresIn: 60
                })

                const refreshTokenPayload = {
                    user: body.user,
                    refresh_token: uuid.v4()
                }

                const refreshToken = jwt.sign(refreshTokenPayload, process.env.SECRET, {
                    expiresIn: 60 * 60 * 24 * 30
                })

                await userRepository.saveUserToken(body.user, refreshToken)

                res.cookie('refresh_token', refreshToken);
                res.status(200).json({ auth: true, token: accessToken })
            } else {
                res.status(401).json("User was not authenticated.")
            }
        } catch (error) {
            next(error);
        }
    });

module.exports = apiRouter;