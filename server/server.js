require('dotenv').config(); //environment variables
const express = require('express');
const morgan = require("morgan"); //middleware
const db = require("./db");
const cors = require("cors")

const app = express();
//-------------------

//express middleware:
app.use(cors()); //allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources
app.use(morgan("tiny")); //console.log the called api in "tiny" format
app.use(express.json()); //a built in middleware function in Express
                         // It parses incoming JSON requests and puts 
                         //the parsed data in req.body.

//-----------------------



//RESTful API:
//get all brand rating
app.get("/api/v1/brandRatings", async(req,res) => {
    try{
        // const results = await db.query("select * from brands");
        const brandRatingData = await db.query(
            "SELECT * FROM brands LEFT JOIN (SELECT brand_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY brand_id) AS reviews ON brands.id = reviews.brand_id;"
        )

        res.status(200).json({ 
    	    status: "success",
            results: brandRatingData.rows.length, 
            data: {
                // brand: results.rows //result is an obj containing array rows, which has the records in our database table
                brand: brandRatingData.rows 
            }  
        })  	
    } catch (error){
        console.log(error);
    }
    
})

//get a brand rating (using dynamic URL)
app.get("/api/v1/brandRatings/:id", async (req, res)=>{  
    try {
        //get brand detail
        const brand = await db.query(
            //`select * from brands where id = ${req.params.id}` //we can do this but interpolation is not recommended in query
                                                                 //use parameterized query instead to avoid sql injection
            // "select * from brands where id = $1", [req.params.id]; //$1 is placeholder for req.params.id
            
            "SELECT * FROM brands LEFT JOIN (SELECT brand_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY brand_id) AS reviews ON brands.id = reviews.brand_id WHERE id=$1;", [req.params.id]
            
            );

        //get brand review
        const reviews = await db.query(
             "select * from reviews where brand_id = $1", [req.params.id] //$1 is placeholder for req.params.id
            );
        console.log(reviews);
        res.status(200).json({
            status: "success",
            data:{
               brand: brand.rows[0],
               reviews: reviews.rows
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
    } catch (err){console.log(err);}
})

//create new review for a brand
app.post("/api/v1/brandRatings/:id/addReview", async(req, res) => {
    try{
        const newReview = await db.query("INSERT INTO reviews (brand_id, name, review, rating) VALUES ($1,$2,$3,$4) RETURNING *;", [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: 'success',
            data:{review: newReview.rows[0]}
         })
    } catch(err){console.log(err)}
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
app.delete("/api/v1/brandRatings/:id", async (req, res)=>{
    try{
        const statement = "DELETE FROM brands WHERE id = $1";
        const value = [req.params.id];
        const results = await db.query(statement,value);
        res.status(204).json({ //status code 204: no content
            status: "success",
        })
        // res.redirect("http://localhost:3000") //WRONG: cannot redirect because client and server are running on different ports
                                                //server is on port 3001 (we choose this port)
                                                //client (react app) is on 3000 (default)
                                                //postgres is on 5432
    } catch(err){
        console.log(err)
    }
    
})



//-------------------

const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})