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


app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

 
app.post("/", (req, res) => {
  request('http://shein-orders.herokuapp.com/api/shein?link='+encodeURIComponent(req.body.link), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let jsonData = JSON.parse(body);
      res.render("result", { data:jsonData, title: "result" });
    }
  })
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