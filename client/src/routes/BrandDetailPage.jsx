import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrandsContext } from '../context/BrandsContext';
import BrandFinder from '../apis/BrandFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

function BrandDetailPage(){
    const {id} = useParams();
    const {selectedBrand, setSelectedBrand} = useContext(BrandsContext)

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await BrandFinder.get(`/${id}`)
                // console.log(response);
                setSelectedBrand(response.data.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchData() //remember to call fetchData
    }, [])

    return ( 
        
        <div> 
            {/*load the selectedBrand.name only if selectedBrand is defined (selectedBrand is set to null at the beginning*/}
            {selectedBrand && (  
                <>
                    <h1 className='text-center display-1'>{selectedBrand.brand.name}</h1>
                    <div className="text-center">
                        <StarRating rating={selectedBrand.brand.average_rating}></StarRating>
                        <span className="text-warning">
                            {selectedBrand.brand.count? `(${selectedBrand.brand.count})`: "(0)"}
                        </span>
                    </div>
                    <div className='mt-3'>
                        <Reviews reviews={selectedBrand.reviews}/> {/*response.data.data.reviews */}
                    </div>
                    <AddReview/>
                </>
                
            )} 

        </div>

    )
}

export default BrandDetailPage;

