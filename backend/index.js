const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors({ origin: 'http://localhost:5173' }))

const data = {"name": "nickelcy"}

app.get("/", (req, res) => {
  res.send(data)
})

app.listen(4000)