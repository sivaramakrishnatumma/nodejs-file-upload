const express = require("express");
const app = express();
const port = 3000;

const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.options("*", cors());

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html")));
app.post("/fileupload", (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath =
      path.resolve(__dirname, "documents") + "/" + files.filetoupload.name;
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
      res.send("File uploaded and moved!");
    });
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
