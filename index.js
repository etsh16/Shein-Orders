const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");
const port = process.env.PORT || "8000";
const v1 = require("./src/routers/v1");
const request = require('request');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true ,limit: '50mb'}));
app.use('/assets',express.static(path.join(__dirname, "/views/assets")));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use("/api", v1);

const sheinController = require('./src/controllers/Shein.Controller');



app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

 
// app.post("/", (req, res) => {
//   request('https://shein-orders.herokuapp.com/api/shein?link='+encodeURIComponent(req.body.link), function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       let jsonData = JSON.parse(body);
//       let datainv= parseFloat(req.body.inv||0)
//       res.render("result", { data:jsonData,inv:datainv, title: "result" });
//     }
//   })
// });

app.post("/", async (req, res, next) => {
  try {
    var data = await sheinController.getItemsOff(req.body.link);
    var datainv= parseFloat(req.body.inv||0);
    var info = data.info;
    delete data['info'];
    res.render("result", { data:data,inv:datainv, title: info.groupInfo.groupName,user:info.userInfo.nickname });
  } catch (error) {
    next(error)
  }
});



app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

//------------------- Errors -------------------//

app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || "Error Processing your request";

  res.status(status).send({
    error,
  });
});

module.exports = app;