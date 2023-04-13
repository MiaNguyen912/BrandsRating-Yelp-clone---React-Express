import React, { useContext, useEffect } from 'react'
import BrandFinder from '../apis/BrandFinder';
import { BrandsContext } from '../context/BrandsContext';

function BrandList(props) {
    const {brands, setBrands} = useContext(BrandsContext);
    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await BrandFinder.get("/ ") //baseURL is "http://localhost:3001/api/v1/brandRatings"
                setBrands(response.data.data.brand)
            } catch (error){
                
            }
        }
        fetchData();
    }, [])

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
                    <tr>   
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
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default BrandList