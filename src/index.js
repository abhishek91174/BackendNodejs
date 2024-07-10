   
   const{dbConnect}=require("../src/Db/conn");
   
   const app=require("./app");



   dbConnect().then((_) => {
    app.listen(process.env.PORT || 6000,()=>{
        console.log(`server is running on ${process.env.PORT}`);

    })
  });
  