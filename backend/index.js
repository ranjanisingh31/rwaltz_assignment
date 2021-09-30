const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const connectDB = require('./config/database');
const app = express();
const api = require("./routes/api.js");
var fileupload = require("express-fileupload");
app.use(fileupload());
app.use(cors());
app.use(body.json());

const dotenv = require("dotenv");
dotenv.config({ path: './config/config.env' });

app.use("/api", api);

connectDB();
const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, function () {
    console.log(`server running in ${process.env.NODE_ENV
        } mode on port ${PORT}`);

});


