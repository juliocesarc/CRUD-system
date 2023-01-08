import express from "express";
import { router } from "./routes"

const app = express()
const cors = require('cors')

app.use(cors())
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions))

app.use(express.json())
app.use(router)

app.listen(3333, () => {
    console.log('Rodando')
})