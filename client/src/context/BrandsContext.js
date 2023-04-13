import React, {useState, createContext} from 'react';

export const BrandsContext = createContext(); //initialize context


function BrandsContextProvider (props){
    const [brands, setBrands] = useState([])
    return(
        <BrandsContext.Provider value={{brands, setBrands}}>
            {props.children }
        </BrandsContext.Provider>
    )
}
export default BrandsContextProvider;