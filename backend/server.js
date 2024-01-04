require("dotenv").config();
const express = require("express");
const instanceSequelize = require("./database");

//APP
const app = express();
app.use(express.json());

//ROUTERS
const routerBookings = require("./routes/bookings");

app.use("/bookings", routerBookings);

//DATABASE
instanceSequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

//INITIALIZE TABLES/DATA
require("./models/bookings");

app.get("/", function (req, res) {
  res.send(req.headers, req.originalUrl, req.method, req.body);
});

//LISTENER
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener.address().port);
});