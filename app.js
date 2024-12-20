const express = require("express")
const cors = require("cors")

require("dotenv").config()

var app = express();
app.use(express.json())

app.use(cors())