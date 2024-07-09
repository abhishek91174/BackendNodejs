const express=require("express");
  const app=express();

  const cors=require("cors");
  const cookie=require("cookie-parser");
   

  app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
  }));
  

  app.use(express.json({limit:"10mb"}));
  app.use(express.urlencoded({extended:true}));
  app.use(express.static("public"));
  app.use(cookie())



  module.exports= app;