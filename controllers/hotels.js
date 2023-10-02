const Hotel = require("../models/hotelSchema");
const Room = require("../models/roomsSchema");

const createHotel = async(req,res)=>{
    const newHotel = new Hotel(req.body);
    
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    } catch (error){
        res.status(400).json(error)
    }
};

const updateHotel = async(req,res)=>{

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true})
        res.status(200).json(updatedHotel);
    } catch (error){
        res.status(400).json(error)
    }
};

const getAllHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };

const getHotelById = async(req,res)=>{

    try {
        const foundHotel = await Hotel.findById(req.params.id);
        res.status(200).json(foundHotel);
    } catch (error){
        res.status(400).json(error)
    }
};

const deleteHotel = async(req,res)=>{
    
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("The hotel has been deleted");
    } catch (error){
        res.status(400).json(error)
    }
};

const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
module.exports = {createHotel,updateHotel,deleteHotel,getAllHotels,getHotelById,getHotelRooms};