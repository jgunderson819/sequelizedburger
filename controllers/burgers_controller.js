let express = require("express");
let router = express.Router();
let db = require("../models");
let bodyParser = require("body-parser");

// show all burger data in the database
router.get("api/all", function(req,res){
    db.burgers.findAll().then(function(results){
        res.json(results);
    });
});

// get all the burgers in the database and render the index.handlebars page
router.get("/burgers", function(req,res){
    db.burgers.findAll.then(function(data){
        let hbsObject = {burgers: data};
        res.render("index", hbsObject);
    });
});

//get route to index
router.get("/", function(req,res){
    res.redirect("/burgers");
});

//post route back to index
router.post("/burgers/create", function(req,res){
    db.burgers.create({
        burger_name: req.body.burger_name,
        devoured: false
    }).then(function(result){
        console.log(result);
            res.redirect("/burgers");
            
    });
});
// put route
router.put("/burgers/update", function(req,res){
    let eaten = {
        devoured: 1
    }
    db.burgers.update(eaten,{
        where: {
            id : req.body.burger_id
        }
    }).then(function(result){
        console.log(result);
        res.redirect("/");
    });
});

