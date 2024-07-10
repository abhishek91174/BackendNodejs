const mongoose=require("mongoose");

const  jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        lowercase:true,
        trim:true,
    },


    fullName:{
        type:String,
        required:[true,'fullName is required'],
        index:true,
        trim:true,
    },


    avtar:{
        type:String,  // cloudnary url
        required:[true,' avtar is required']
    },

    coverImg:{
        type:String,  // cloudnary url

    },
watchHistory:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"video"
    }
],
password:{
    type:String,
    required:[true,'password is required']
},
refreshToken:{
    type:String
}

},
{
    timestamps:true
}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

this.password=bcrypt.hash(this.password,10);
next();

});


userSchema.methods.isPasswordCorrect=async function (password){
     return await bcrypt.compare(password,this.password);
}


userSchema.methods.generateAceesToken= function (){
  return  jwt.sign(
        {
        _id:this._id,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}


userSchema.methods.generateRefreshToken= function(){
    return  jwt.sign(
        {
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)



}

const userModel= mongoose.model("users",userSchema);
module.exports={userModel};