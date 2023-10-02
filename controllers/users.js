const Hotel = require("../models/usersSchema");

const updateUser = async(req,res)=>{

    try {
        const updatedUser = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true})
        res.status(200).json(updatedUser);
    } catch (error){
        res.status(400).json(error)
    }
};

const getAllUser = async(req,res,next)=>{
    
    try {
        const foundUser = await Hotel.find();
        res.status(200).json(foundUser);
    } catch (error){
        // res.status(400).json(error)
        next(error)
    }
};

const getUserById = async(req,res)=>{

    try {
        const foundUser = await Hotel.findById(req.params.id);
        res.status(200).json(foundUser);
    } catch (error){
        res.status(400).json(error)
    }
};

const deleteUser = async(req,res)=>{
    
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("The User has been deleted");
    } catch (error){
        res.status(400).json(error)
    }
};

module.exports = {updateUser,deleteUser,getAllUser,getUserById};