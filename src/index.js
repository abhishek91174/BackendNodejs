   
   const{dbConnect}=require("../src/Db/conn");
   
   const app=require("./app");



   dbConnect().then((_) => {
    app.listen( 6000,()=>{
        console.log(`server is running on 6000 `);

    })
  });
  