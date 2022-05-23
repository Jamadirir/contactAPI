const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const { success, error } = require("consola");
const { connect } = require("mongoose");

//Bring in the app constants
const { DB, PORT } = require("./config/index");

//initialize the application
const app = express();

//middleWares
app.use(cors());
app.use(bp.json());

app.use("/api/contact", require("./routes/contact"));

const startApp = async () => {
  //connect to the DB
  try {
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    success({ message: `successfully with the Database \n${DB}`, badge: true });
    //start listening for the server
    app.listen(PORT, () =>
      success({ message: `Server is started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `unable to connect with the Database \n${err}`,
      badge: true,
    });
    startApp();
  }
};

startApp();
