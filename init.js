const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
let allChats=[
    {
        from:"Balram",
        to:"Srikant",
        msg:"Meet me @pal-hights as usal.",
        created_at:new Date(),
    },
    {
        from:"Rajesh",
        to:"Avinab",
        msg:"When to play chess today?",
        created_at:new Date(),
    },
    {
        from:"Essa",
        to:"Momo",
        msg:"Momo chalona momos khane chalte hai.",
        created_at:new Date(),
    },
    {
        from:"Momo",
        to:"Essa",
        msg:"Accha thik hai chalenge.",
        created_at:new Date(),
    },
    {
        from:"Essa",
        to:"Ananya",
        msg:"Ajj accha sale hua hai.",
        created_at:new Date(),
    },
    {
        from:"Ananya",
        to:"Essa",
        msg:"Kitna profit hua?",
        created_at:new Date(),
    },

];
Chat.insertMany(allChats);


