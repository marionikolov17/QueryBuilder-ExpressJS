import express from "express";

import * as userService from "./../services/user.service";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  const users = await userService.getUsers(req.body);

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

router.post("/create", async (req: express.Request, res: express.Response) => {
  try {
    const createdUser = await userService.createUser(req.body);

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

router.get("/getDetail", async (req: express.Request, res: express.Response) => {
  const user = await userService.getUser(req.body);

  res.status(200).json({
    status: "success",
    data: {
      user
    },
  });
});

export default router;
