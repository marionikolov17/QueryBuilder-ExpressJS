import express from "express";

export default function expressConfig(app: express.Application) {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    return app;
}