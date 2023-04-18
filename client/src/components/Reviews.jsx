import React from 'react'
import StarRating from './StarRating'

const Reviews = (props) => {
  return (
    <div className='row row-cols-3 mb-2'>
        {props.reviews.map((review)=>{
            return(
                <div 
                    className="card text-white bg-secondary mb-3 mr-4" 
                    style={{maxWidth: "30%"}}
                    key={review.id}
                >
                    <div className="card-header d-flex justify-content-between">
                        <span>{review.name}</span>
                        <span><StarRating rating={review.rating}/></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{review.review}</p>
                    </div>
                </div>

            )
           
        })}




        {/* <div className="card text-white bg-secondary mb-3 mr-4" style={{maxWidth: "30%"}}>
            <div className="card-header d-flex justify-content-between">
                <span>Mia</span>
                <span><StarRating rating={3}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">I love this brand so much</p>
            </div>
        </div> */}

        
    </div>

    

    
  )
}

export default Reviews