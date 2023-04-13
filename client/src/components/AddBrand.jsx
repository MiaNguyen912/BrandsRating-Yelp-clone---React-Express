import React from 'react'

const AddBrand = () => {
  return (
    <div className="mb-4">
        
        <form action="">
            <div className="form-row"> {/*type ".form-row" + tab to generate this line in short-hand */}
                <div className="col">
                    <input type="text" className="form-control" placeholder="Name"/>
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Description/Category"/>
                </div>
                <div className="col">
                    <select className="custom-select my-1 mr-sm-2" id="">
                        <option disabled>Price range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button className="btn btn-secondary">Add</button>
            </div> 
        </form>
        


        
        
  
        
    </div>
  )
}

export default AddBrand