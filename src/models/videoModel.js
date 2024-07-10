const mongoose=require("mongoose");

const mongose=require("mongoose-aggregate-paginate-v2");
  const videoSchema=new mongoose.Schema({

    videoFile:{
        type:String,   // cloudinary url
        required:true
    },
     thumbnail:{
        type:String,
        required:true
     },
     title:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     duration:{
        type:Number,   // cloudnary url
        required:true
     },
     views:{
        type:Number,
        default:0
     },
     isPublished:{
        type:Boolean,
        default:true
     },
     owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     }

  },
  {
    timestamps:true
  }
);

videoSchema.plugin(mongose);

  const videoModel= mongoose.model("videos",videoSchema);
  module.exports={videoModel};