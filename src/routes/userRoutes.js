import { Router } from "express";
import { registerUser } from "../controllers/userController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

router.post(
  "/register",
  // upload.fields([
  //   {
  //     name: "avatar",
  //     maxCount: 1
  //   }
  //   {
  //     name: "coverImage",
  //     maxCount: 1
  //   }
  // ]),
  upload.single('avatar'),
  registerUser
);

export default router;
