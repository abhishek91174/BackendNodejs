   
   const{dbConnect}=require("../src/Db/conn");
   const port=8000;



   dbConnect().then((_) => {
    // createSuperAdmin();
    // server.listen(port, (_) => console.log(`Server is Running on port ${port}`));
  });
  