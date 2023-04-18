import React, {useState, createContext} from 'react';

export const BrandsContext = createContext(); //initialize context



function BrandsContextProvider (props){
    const [brands, setBrands] = useState([])
    const [selectedBrand, setSelectedBrand] = useState(null)

    function addBrand(newBrand){
        setBrands([...brands, newBrand])
    }
    

    return(
        <BrandsContext.Provider value={{brands, setBrands, addBrand, selectedBrand, setSelectedBrand}}>
            {props.children }
        </BrandsContext.Provider>
    )
}
export default BrandsContextProvider;