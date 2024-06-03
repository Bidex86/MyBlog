const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
//const bodyparser = require("body-parser")
const authRouter = require("./controllers/auth")
const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/user")
const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_URL, 
    (console.log("DB Connected successfully"))
) 

mongoose.connection.on("error", (err) => {
    console.log("An error occurred")
    console.log(err)
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/auth", authRouter)
app.use("/blog", blogRouter)
app.use("/user", userRouter)

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

