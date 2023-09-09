const path = require("path");
const express = require("express");
const fs=require("fs");
const app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().catch(err => console.log(err));
const port = 80;
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/details',{ useNewUrlParser: true, useUnifiedTopology: true });
  console.log("connected")
}
const loginSchema = new mongoose.Schema({
  username: String,
  password:String
});
const registerSchema = new mongoose.Schema({
  name: String,
  age: String,
  username: String,
  password:String
});
const contactSchema = new mongoose.Schema({
  usercontact: String,
  passlogin:String,
  message:String
});
const Userlogin = mongoose.model('Loguser', loginSchema);
const Userregister = mongoose.model('reguser', registerSchema);
const Usercontact = mongoose.model('contuser', contactSchema);
app.use(express.static(path.join(__dirname, '/')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'/', 'index.html'));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname,'/', 'about.html'));
});
app.get("/instruments", (req, res) => {
  res.sendFile(path.join(__dirname,'/', 'instruments.html'));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname,'/', 'contact.html'));
});
app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname,'/', 'blog.html'));
});

app.post("/submit", (req, res) => {
  let registerdata =new Userregister(req.body);
  console.log(registerdata);
  registerdata.save().then(()=>{
    res.redirect('/');
  }).catch(()=>{
    res.status(404).send("Error 404 not found");
  });
});
app.post("/login", (req, res) => {
  let logindata =new Userlogin(req.body);
  console.log(logindata);
  logindata.save().then(()=>{
    res.redirect('/');
  }).catch(()=>{
    res.status(404).send("Error 404 not found");
  });
});
app.post("/contactsub", (req, res) => {
  console.log("POST request received:", req.body);
  let contactdata =new Usercontact(req.body);
  console.log(contactdata);
  contactdata.save().then(()=>{
    res.redirect('/contact');
  }).catch(()=>{
    res.status(404).send("Error 404 not found");
  });
});
app.listen(port, () => {
  console.log(`Port 80 running at http://localhost:${port}`);
});
