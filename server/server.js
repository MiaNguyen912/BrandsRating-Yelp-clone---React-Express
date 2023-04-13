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
    try{
        const results = await db.query("select * from brands")
        console.log(results);  //result is an obj containing array rows, which has the records in our database table
        res.status(200).json({ 
    	    status: "success",
            results: results.rows.length, 
            data: {
                brand: results.rows
            }  
        })  	
    } catch (error){
        console.log(error);
    }
    
})

//get a brand rating (using dynamic URL)
app.get("/api/v1/brandRatings/:id", async (req, res)=>{  
    try {
        const results = await db.query(
            //`select * from brands where id = ${req.params.id}` //we can do this but interpolation is not recommended in query
                                                                 //use parameterized query instead to avoid sql injection
            //`select $2 from brands where id = $1`, [req.params.id, `name`] //$1, $2 are placeholders for req.params.id and 'name' respectively
            "select * from brands where id = $1", [req.params.id] //$1 is placeholder for req.params.id
            );
        res.status(200).json({
            status: "success",
            data:{
               brand: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err);    
    }
    
})

//create a brand
app.post("/api/v1/brandRatings", async (req,res)=>{
    console.log(req.body);
    try{
        const statement = "INSERT INTO brands (name, description, price_range) VALUES ($1, $2, $3) RETURNING *";
        const value = [req.body.name, req.body.description, req.body.price_range]
        const results = await db.query(statement,value);

        res.status(201).json({ //status code 201: created
            status: "success",
            data:{
                brand: results.rows[0]
            }
        })
    } catch (err){
        console.log(err);
    }
    
})

//update brands
app.put("/api/v1/brandRatings/:id", async (req, res)=>{
    try {
        const statement = "UPDATE brands SET name = $1, description = $2, price_range = $3 WHERE id = $4 RETURNING *";
        const value = [req.body.name, req.body.description, req.body.price_range, req.params.id];
        const results = await db.query(statement, value);

        res.status(200).json({
            status: "success",
            data:{
                brand: results.rows[0]
            }
        })
    } catch (err){
        console.log(err)
    }
    
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