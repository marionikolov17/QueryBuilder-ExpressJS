import express from "express";

import * as userService from "./../services/user.service";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  const users = await userService.getUsers();

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

router.get("/:id", async (req: express.Request, res: express.Response) => {
  const user = await userService.getUser(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user
    },
  });
});

export default router;
