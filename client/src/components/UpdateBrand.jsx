import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BrandFinder from '../apis/BrandFinder'

const UpdateBrand = (props) => {
  // const test = useParams();
  // console.log(test); //print out {id: brand.id}
  const {id} = useParams(); //access to the id
  let navigate = useNavigate();


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(()=>{
        const fetchData = async()=>{
            const response = await BrandFinder.get(`/${id}`); //check the get a brand method in server.js to see how it responds (app.get("/api/v1/brandRatings/:id, ...))
            // console.log(response.data.data);
            setName(response.data.data.brand.name);
            setDescription(response.data.data.brand.description);
            setPriceRange(response.data.data.brand.price_range) 
        }
        fetchData(); //call fetchData()
  }, [])

  async function handleSubmit(event){
    event.preventDefault();
    const updatedBrand = await BrandFinder.put(`/${id}`, {
      name,
      description,
      price_range: priceRange
    })
    // console.log(updatedBrand)
    navigate("/")
  }

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            className='form-control'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            id="description" 
            className='form-control'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price-range">Price Range</label>
          <input 
            type="number" 
            id="price-range" 
            className='form-control'
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
          />
        </div>

        <button className='btn btn-dark' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default UpdateBrand