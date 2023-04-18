import React, { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import BrandFinder from '../apis/BrandFinder';
import { BrandsContext } from '../context/BrandsContext';

function BrandList(props) {
    const {brands, setBrands} = useContext(BrandsContext);
    let navigate = useNavigate(); //navigate the directory

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await BrandFinder.get("/ ") //baseURL is "http://localhost:3001/api/v1/brandRatings"
                setBrands(response.data.data.brand) //in server.js, app.get() will respond with "brand" record in the "data" object
            } catch (error){}
        }
        fetchData();
    }, [])

    async function handleDelete(event, id){
        event.stopPropagation(); //when click on button, handleDelete is called, then handleBrandSelect is call
                                //we have to stop propagation when calling handleDelete to not calling handleBrandSelect 
        try{
            const response = await BrandFinder.delete(`/${id}`); //delete method in "http://localhost:3001/api/v1/brandRatings/id" will delete record from our database table
            setBrands(brands.filter((brand) =>{ //set the brands array to exclude the brand with the given id
                return brand.id !== id;
            }));  
            console.log(response);
        } catch (err){
            console.log(err)
        };
    }  

    function handleUpdate(event, id){
        event.stopPropagation(); //when click on button, handleUpdate is called, then handleBrandSelect is call
                                 //stopPropagation when calling handleUpdate will prevent calling handleBrandSelect 
        navigate(`/brandRatings/${id}/update`) //go to this url when function is called
    }

    function handleBrandSelect(id){
        navigate(`/brandRatings/${id}`);
    }

    return (
        <div className='list-group'>
            <table class="table table-dark table-hover">
                <thead>
                    <tr className='bg-info'>
                        <th scope="col">Brand</th>
                        <th scope="col">Description/Category</th>
                        <th scope="col">Price range</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {brands && brands.map((brand)=>{  //if brands exist (if we successfully fetch data and put in our context), call the brand.maps()
                        return(
                            <tr onClick={() => handleBrandSelect(brand.id)} key = {brand.id}>   
                                <th>{brand.name}</th>
                                <td>{brand.description}</td>
                                <td>{"$".repeat(brand.price_range)}</td>
                                <td>reviews</td>
                                <td>
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={(event)=> handleUpdate(event, brand.id)}
                                    >Update</button>
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-secondary" 
                                        onClick={(event)=> handleDelete(event, brand.id)} //if we write onClick={handleDelete(brand.id)}, that function will be called right away
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    {/* <tr>   
                        <th scope="row">Lulus</th>
                        <td>Lulus</td>
                        <td>Lulus</td>
                        <td>Lulus</td>
                        <td><button className="btn btn-secondary">Update</button></td>
                        <td><button className="btn btn-secondary">Delete</button></td>
                    </tr>
                    <tr>
                        <th scope="row">Lulus</th>
                        <td>Lulus</td>
                        <td>Lulus</td>
                        <td>Lulus</td>
                        <td><button className="btn btn-secondary">Update</button></td>
                        <td><button className="btn btn-secondary">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>

        </div>
    )
}

export default BrandList