require('dotenv').config(); //environment variables
const express = require('express');
const morgan = require("morgan"); //middleware
const db = require("./db");

const app = express();
//-------------------

//express middleware:
app.use(express.json()); //a built in middleware function in Express
                         // It parses incoming JSON requests and puts 
                         //the parsed data in req.body.

//-----------------------



//RESTful API:
//get all brand rating
app.get("/api/v1/brandRatings", async(req,res) => {
    const result = await db.query("select * from brands")
    console.log(result);
    res.status(200).json({ //
    	    status: "success",
            data: {
                brand: ["Banana Republic", "Fashion Nova"]
            }  
    })  	
})

//get a brand rating (using dynamic URL)
app.get("/api/v1/brandRatings/:brandid", (req, res)=>{  
    console.log(req.params);
    res.status(200).json({
        status: "success",
        data:{
            brand: "Lulus",
        }
    })
})

//create a brand
app.post("/api/v1/brandRatings", (req,res)=>{
    console.log(req.body);
    res.status(201).json({ //status code 201: created
        status: "success",
        data:{
            brand: "Lulus",
        }
    })
})

//update brands
app.put("/api/v1/brandRatings/:id", (req, res)=>{
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "success",
        data:{
            brand: "Lulus",
        }
    })
})

//delete a brand
app.delete("/api/v1/brandRatings/:id", (req, res)=>{
    res.status(204).json({ //status code 204: no content
        status: "success",
    })
})



//-------------------

const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})