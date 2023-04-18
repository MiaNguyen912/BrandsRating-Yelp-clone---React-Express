import React, { useState } from 'react'
import BrandFinder from '../apis/BrandFinder';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddReview = () => {
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location); //to see detail


    async function handleSubmitReview(e){
        e.preventDefault();
        try{
             //import api
            const response = await BrandFinder.post(`${id}/addReview`, {
                name,
                review: reviewText,
                rating
            });
            // console.log(response);

            //reload the page to see newly posted review
            navigate("/");  //navigate to home page and
            navigate(location.pathname); //immediately go back to current page 
        } catch(err){console.log(err)}
       

       

    }

  return (
    <div className='mb-2'>
        <form action=''>
            <div className="form-row">
                <div className="form-group col-8">
                    <label htmlFor="name">Name</label>
                    <input 
                        id='name' 
                        placeholder="Name" 
                        type="text" 
                        className='form-control'
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        />
                </div>
                <div className="form-group col-4">
                    <label htmlFor="rating">Rating</label>
                    <select 
                        id="rating" 
                        className="custom-select"
                        value={rating}
                        onChange={e=>setRating(e.target.value)}
                    >
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea 
                        id="review" 
                        className="form-control"
                        value={reviewText}
                        onChange={e=>setReviewText(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <button type="submit" onClick={handleSubmitReview} className='btn btn-dark'>Submit</button>

        </form>
    </div>
  )
}

export default AddReview