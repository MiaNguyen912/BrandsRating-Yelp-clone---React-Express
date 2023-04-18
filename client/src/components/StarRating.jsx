import React from 'react'

function StarRating(props) {
    const stars = [];
    for (let i=1; i<=5; i++){
        if(props.rating >= i) stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>) //solid star
        else if (i === Math.ceil(props.rating) && !Number.isInteger(props.rating)){
            stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-warning"></i>) //decimal number (not integer) gives half solid star
        }
        else stars.push(<i key={i} className="fa-regular fa-star text-warning"></i>); //horrow star
    }

    return (
        <>
            {stars}
        </>
    )
}

export default StarRating;  