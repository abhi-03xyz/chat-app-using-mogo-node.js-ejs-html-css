const express=require("express");
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//index route
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
   // console.log(chats);
    //res.send("working");
    res.render("index.ejs",{chats});
});
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
//create route
app.post("/chats",(req,res)=>{
    let {from, to, msg}=req.body;
    let newChat=new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
        updated_at:new Date(),
    });
  //  console.log(newChat);
     newChat.save()
     .then((res)=>{
        console.log("chat was saved");
     })
     .catch((err)=>{
        console.log(err);
     });
     
     res.redirect("/chats");
   // res.send("working");
});
//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{ chat });

});
//update route
app.put("/chats/:id",async (req,res)=>{
let { id }=req.params;
let { msg:newMsg }=req.body;
let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg,updated_at:new Date()},{runValidators: true,new:true});
console.log(updatedChat);
console.log(updatedChat.created_at.toString().split(" ")[4]);
console.log(updatedChat.updated_at.toString().split(" ")[4]);


res.redirect("/chats");
});
//destroy route
app.delete("/chats/:id",async(req,res)=>{
 let { id }=req.params;
 let deletedChat=await Chat.findByIdAndDelete(id);
 console.log(deletedChat);
 res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("Root route is working");
});

app.listen(8080,()=>{
    console.log("Server is listining on port 8080");
});