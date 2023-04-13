import React, {useState, createContext} from 'react';

export const BrandsContext = createContext(); //initialize context



function BrandsContextProvider (props){
    const [brands, setBrands] = useState([])

    function addBrand(newBrand){
        setBrands([...brands, newBrand])
    }

    return(
        <BrandsContext.Provider value={{brands, setBrands, addBrand}}>
            {props.children }
        </BrandsContext.Provider>
    )
}
export default BrandsContextProvider;