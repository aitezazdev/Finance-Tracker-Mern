import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { deleteAccount, getProfileInfo, updateUserProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getProfileInfo);
userRouter.put("/update-profile", authMiddleware, updateUserProfile);
userRouter.delete("/delete-account", authMiddleware, deleteAccount);

export default userRouter;
