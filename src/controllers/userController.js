const {Types}=require("mongoose");
const {userModel}=require("../models/userModel");


const registerUser=  function (req,res){
    try {
         

       return res.status(200).json({message:"backend project"});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}


module.exports={registerUser};