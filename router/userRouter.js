const express = require("express");
const router = express.Router();
const {
  NewUSer,
  GetAllUser,
  deleteUser,
  updateUser,
  login,
  catTime,
} = require("../controller/userConroller");
router.route("/login").post(login);
router.route("/").get(GetAllUser).post(NewUSer);

router.route("/:id").put(updateUser).delete(deleteUser);
router.route("/:id").post(catTime);
module.exports = router;
