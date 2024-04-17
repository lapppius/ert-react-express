import express from "express";
import radiosRouter from "./radios.js";
import usersRouter from "./users.js";

const router = express.Router();

router.use("/radios", radiosRouter);
router.use("/users", usersRouter);

export default router;
