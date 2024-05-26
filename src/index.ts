import express from "express";

import expressConfig from "./config/express.config";

import router from "./routes";

const app = express();

expressConfig(app);

app.use(router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
