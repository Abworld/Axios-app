const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
//Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("iReportImg");

// Check File Type
function checkFileType(file, cb) {
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mine
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only");
  }
}
// Init app
const app = express();
// EJS
app.set("view engine", "ejs");
//Public Folder
app.use(express.static("./public"));
app.get("/", (req, res) => res.render("index"));

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("index", {
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.render("index", {
          msg: "Error: No File Selected !",
        });
      } else {
        res.render("index", {
          msg: "File Uploaded! ",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
});
const port = 3300;

app.listen(port, () => console.log(`Server initiated on port ${port}`));