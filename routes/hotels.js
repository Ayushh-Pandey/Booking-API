const express = require("express");
const {createHotel,updateHotel,deleteHotel,getAllHotels,getHotelById,getHotelRooms} = require("../controllers/hotels");
const {verifyAdmin} = require("../utils/verifyToken");
const router = express.Router();

//create
router.post("/",verifyAdmin,createHotel);
//update
router.put("/:id",verifyAdmin,updateHotel);
//delete
router.delete("/:id",verifyAdmin,deleteHotel);
//get ALL 
router.get("/",getAllHotels);
//get by id
router.get("/:id",getHotelById);
router.get("/rooms/:id",getHotelRooms);
module.exports = router;