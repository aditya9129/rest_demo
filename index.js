const express=require("express");
const app=express();
const port=8000;
var methodOverride = require('method-override')
const path=require("path");
const { v4: uuidv4 } = require('uuid');
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"views")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
let posts=[{

    username:"aditya",
    content:"coding is love",
    id:uuidv4(),
},
{   
    username:"aditya",
    content:"coding is love",
    id:uuidv4(),
},
{   
    username:"aggarwal",
    content:"coding is love",
    id:uuidv4(),
}];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
    console.log("running");
});
//to create new post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
//to add new post to arr
app.post("/posts",(req,res)=>{
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});
   res.redirect("/posts");
})
//to update existing post after editing
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newcontent;
    res.redirect("/posts");
  });
// to delete post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
  });
//to view post in detail
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    
    res.render("show.ejs",{post});
    
})
//to edit post
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>id==p.id);
    console.log(post);
    res.render("edit.ejs",{post});
})


app.listen(port);