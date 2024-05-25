import express from "express";

import expressConfig from "./config/express.config";

const app = express();

expressConfig(app);

// Simulate getDetail
app.get("/detail", (req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "working"
        }
    });
});

// Simulate getList
app.get("/list", (req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "working"
        }
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});