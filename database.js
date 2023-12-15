const mongoose = require("mongoose")

async function connectToDatabase(dbUrl) {
    if(typeof dbUrl !== "string"){
        console.log('Provide a valid string db url');
        return;
    }
    console.log("Connecting to database with url", dbUrl);
    return mongoose
      .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((_) => {
        console.log("Connected to database successfully");
      })
      .catch((err) => {
        console.log("Failed connecting to database");
        console.error(err);
      });
  }

async function disconnectFromDatabase() {
    console.log("Disconnecting from database");
    return mongoose
      .disconnect()
      .then((_) => {
        console.log("Disconnected from database successfully");
      })
      .catch((err) => {
        console.log("Failed disconnecting from database");
        console.error(err);
      });
  }
  
module.exports = {connectToDatabase,disconnectFromDatabase}