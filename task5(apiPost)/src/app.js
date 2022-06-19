require("../database/connect")
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const Routes = require("../routes/route")
app.use(Routes)
module.exports = app