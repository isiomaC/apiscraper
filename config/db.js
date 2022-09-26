const mongoose = require("mongoose");

const connectDataBase = (app) => {
  const options = {
    useNewUrlParser: true,
    autoIndex: false, // ignore building indexes
    maxPoolSize: 10, //  up to 10 socket connections
    // useUnifiedTopology: true
   };

   //"mongodb+srv://devStem:ce819TAonZa43W4X@devstemcluster.okfqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
   
  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;

    console.log("MongoDB connection with retry if fail");

    mongoose
      .connect(process.env.MONGODB_URI, options)
      .then(() => {
        console.log("MongoDB is connected");
        app.emit("ready");
      })
      .catch((err) => {
        console.log("MongoDB connection unsuccessful, retry after 2 seconds.", err);
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
};

module.exports = connectDataBase