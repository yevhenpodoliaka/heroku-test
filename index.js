const path =require("path")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const Contact =require("./model")

const{DB_HOST,PORT=3000}=process.env
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,"front/build")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"front/build","index.html"))
})
app.get("/contacts", async (req, res) => {
  const contactList = await Contact.find();
  res.json(contactList);
});
app.post("/contacts", async (req, res) => {
const newContacts= await Contact.create(req.body)
    res.status(201).json(newContacts);
})

app.delete("/contacts/:_id", async (req, res) => {
    console.log("del");
    const { _id } = req.params
    const contact = await Contact.findByIdAndDelete(_id)
    console.log(contact, _id)
res.send("contact deleted")

})


app.use((req, res, next) => {
    res.status(404).send("Page not found")
})

app.use((err, req, res, next) => {
    const { message="Server error", status=500 } = err
    
    res.status(status).send(message)

})

mongoose.connect(DB_HOST, () => {
    console.log("db connect")
})
app.listen(PORT, () => {
  console.log("server ok");
});


