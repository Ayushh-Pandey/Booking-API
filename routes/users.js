const express = require("express");
const { updateUser, deleteUser, getAllUser, getUserById } = require("../controllers/users");
const {verifyAdmin,verifyUser} = require("../utils/verifyToken");
const router = express.Router();

//update
router.put("/:id",verifyUser,updateUser);
//delete
router.delete("/:id",verifyUser,deleteUser);
//get ALL 
router.get("/",verifyUser,getAllUser);
//get by id
router.get("/:id",verifyAdmin,getUserById);
module.exports = router;