const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async function () {
const mongoUrl = 'mongodb+srv://nature_nook:qgOb2KljOmEO4KIM@cluster0.pzgkgjj.mongodb.net/videotube';
//   const mongoUrl= 'mongodb+srv://nature_nook:qgOb2KljOmEO4KIM@cluster0.pzgkgjj.mongodb.net/nature_nook?retryWrites=true&w=majority'

  try {
    console.log("Establishing Mongo DB Connection...");
    const x = await mongoose.connect(mongoUrl);
    console.log(`Mongo DB (${mongoUrl}) Connected :)`);
    return false;
  } catch (error) {
    console.log("==== DB Connection Error ====", error.message);
    throw error;
  }
};

module.exports = { dbConnect };
