import React, { useContext, useState } from 'react'
import BrandFinder from '../apis/BrandFinder'
import { BrandsContext } from '../context/BrandsContext'

function AddBrand() {

  const [name, setName] = useState("") //manage the name field
  const [description, setDescription] = useState("") //manage the description field
  const [priceRange, setPriceRange] = useState("Price range") //manage the price range field

  const {addBrand} = useContext(BrandsContext) //import addBrand function

  async function handleClick(event){
    event.preventDefault(); //prevent page reloading
    try{
        const response = await BrandFinder.post("/", {  //post method will insert new data into our database table
            name: name,
            description: description,
            price_range: priceRange
        })
        //console.log(response); //to see the structure of response objec6
        addBrand(response.data.data.brand); //this will call setBrands(), which adds new brand to the brands array. 
                                            //then the BrandList component will render out all brands in the brands array

        //we can do this instead of addBrand, but must export {brands, setBrands}:
        // const {brands, setBrands} = useContext(BrandsContext);                                    
        // setBrands([...brands, response.data.data.brand]) 
        

    } catch(err){}
  }

  return (
    <div className="mb-4">
        <form action="">
            <div className="form-row"> {/*type ".form-row" + tab to generate this line in short-hand */}
                <div className="col">
                    <input 
                        value={name} //value written in this field will be recorded in the name state, but only be set on change
                        onChange={event => setName(event.target.value)} 
                        type="text" className="form-control" 
                        placeholder="Name"
                    />
                </div>
                <div className="col">
                    <input 
                        value={description} 
                        onChange={event => setDescription(event.target.value)} 
                        type="text" className="form-control" 
                        placeholder="Description/Category"
                    />
                </div>
                <div className="col">
                    <select 
                        className="custom-select my-1 mr-sm-2" id=""
                        value={priceRange} 
                        onChange={event => setPriceRange(event.target.value)} 
                    >
                        <option disabled>Price range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    onClick={handleClick}  //call the handleClick function
                    className="btn btn-secondary"
                >Add</button>
            </div> 
        </form>
        


        
        
  
        
    </div>
  )
}

export default AddBrand