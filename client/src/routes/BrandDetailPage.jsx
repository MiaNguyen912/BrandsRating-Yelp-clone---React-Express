import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrandsContext } from '../context/BrandsContext';
import BrandFinder from '../apis/BrandFinder';

function BrandDetailPage(){
    const {id} = useParams();
    const {selectedBrand, setSelectedBrand} = useContext(BrandsContext)

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await BrandFinder.get(`/${id}`)
                setSelectedBrand(response.data.data.brand);
            } catch(err){
                console.log(err)
            }
        }
        fetchData() //remember to call fetchData
    }, [])

    return ( 
        <div>
            {selectedBrand && selectedBrand.name} {/*load the selectedBrand.name only if selectedBrand is defined (selectedBrand is set to null at the beginning*/}
        </div>
    )
}

export default BrandDetailPage;