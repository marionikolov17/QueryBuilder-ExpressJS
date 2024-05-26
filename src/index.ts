import express from "express";

import expressConfig from "./config/express.config";

import router from "./routes";

import UserBuilder from "./builders/user.builder";
import User from "./database/models/user";

const app = express();

expressConfig(app);

// Simulate getDetail
app.get("/detail", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "working",
    },
  });
});

// Simulate getList
app.get("/list", async (req: express.Request, res: express.Response) => {
  const builder = new UserBuilder();

  const result = await builder.buildQuery();

  res.status(200).json({
    status: "success",
    data: {
      result
    },
  });
});

// Create DB info for testing
app.post("/create", async (req: express.Request, res: express.Response) => {
  try {
    const createdUser = await User.create({
      first_name: "mark",
      last_name: "georgiev",
      username: "mmm",
      email: "mmm@gmail.com",
      password: "1234",
      profile_picture_url: "/url/to/photo",
      languages: "1,2,3",
      user_role: 9,
      visible: 0,
    });

    res.status(201).json({
      status: "success",
      data: {
        message: "Successfully created user!",
        user: createdUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      data: {
        message: err.message,
      },
    });
  }
});

app.use(router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
