import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateBrand from '../components/UpdateBrand';
import { BrandsContext } from '../context/BrandsContext';
import BrandFinder from '../apis/BrandFinder'

function UpdatePage(){
    

//------get name of the brand (this method is not recommended, use the second method instead)
    // const test = useParams();
    // console.log(test); //print out {id: brand.id}
    // const {id} = useParams(); //access to the id of a brand
    // const {brands} = useContext(BrandsContext) //import the brands array
    // const brandTarget = brands.filter(brand => brand.id === id); //this return an array, console.log() to see detail
    // const brandName = brandTarget[0].name;

    //this aproach is bad because if user bookmarked the updatePage and access to it directly
    //instead of accessing from the update button in the Home page
    //we will not be able to access the brand is
    //use this method instead:

    const {id} = useParams(); //access to the id of a brand
    const [name, setName] = useState("");
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await BrandFinder.get(`/${id}`); //check the get a brand method in server.js to see how it responds (app.get("/api/v1/brandRatings/:id, ...))
            console.log(response.data.data);
            setName(response.data.data.brand.name)
        }
        fetchData(); //call fetchData()
    }, [])


    return (
        <div>
            <h1 className='text-center'>Update {name}</h1>
            <UpdateBrand/>
        </div>
    )
}

export default UpdatePage;