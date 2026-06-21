const express = require("express");
const router = express.Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login, logout
} = require("../controllers/UserController");

router.post("/", createUser);
router.post("/login", login);
router.post("/logout", logout);


router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;