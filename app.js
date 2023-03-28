const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB")
.then(() => {
    console.info('connected successfully')  
})
.catch(() => {
    console.error('connection error');
});
const articlesSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article",articlesSchema);
app.route("/articles").get(async function(req,res){

    const foundarticles=await Article.find({});
    if (foundarticles.length>0){
        res.send(foundarticles);
    }
    else {
        res.send("No Articles found");
    }
    
    

}).delete(async function(req,res){

    
     
    await Article.deleteMany().then(() => {
        res.send("Success");
    })
    .catch(() => {
        res.send("Error occurred");
    });
    
    
    
       
    

}).post(async function(req,res){

    
    const newArticle= new Article({
      title: req.body.title,
      content: req.body.content
  
      });
  
      newArticle.save().then(() => {
          res.send("Success");
      })
      .catch(() => {
          res.send("Error occurred");
      });
      
  
  
  });
  app.route("/articles/:requestedTitle").get(async function(req,res){
    const foundarticles=await Article.findOne({title:req.params.requestedTitle});
    if (foundarticles){
        res.send(foundarticles);
    }
    else {
        res.send("No Articles found");
        
    }

  })
  .put(async function(req,res){
    const result=await Article.replaceOne({title:req.params.requestedTitle},{
        title:req.body.title , content: req.body.content });

        if(result.modifiedCount==1){
            res.send("Updated Successfully")
        }
        else{
            res.send("Article Not found")     
           }
        
    

  }).patch(async function(req,res){
    const result=await Article.updateOne({title:req.params.requestedTitle},{
        title:req.body.title , content: req.body.content });
        

        if(result.modifiedCount==1){
            res.send("Updated Successfully")
        }
        else{
            res.send("Article Not found")     
           }
        
    

  }).delete(async function(req,res){
    const result=await Article.deleteOne({title:req.params.requestedTitle},{
        title:req.body.title , content: req.body.content });

        if(result.deletedCount==1){
            res.send("Deleted Successfully")
        }
        else{
            res.send("Article Not found")     
           }
        
    

  });





















// db.articles.insertMany({
//     "_id": "5c139771d79ac8eac11e754a",
//     "title": "API",
//     "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
// },
// {
//     "_id": "5c1398aad79ac8eac11e7561",
//     "title": "Bootstrap",
//     "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
// },
// {
//     "_id": "5c1398ecd79ac8eac11e7567",
//     "title": "DOM",
//     "content": "The Document Object Model is like an API for interacting with our HTML"
// })



