import express from "express"
import bodyParser from "body-parser";
import {setupRabbitMQ} from "./RabbitMQ-Settings/Setup.js"
import mainRoute from "./routers/index.js"

const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/api", mainRoute);

app.listen(port, async() => {
    console.log(`Server is running on ${port}`)
    setupRabbitMQ()
})
