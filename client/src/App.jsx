import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";  //npm install react-router-dom before run this code
import Home from "./routes/Home";
import BrandDetail from "./routes/BrandDetail";
import UpdateBrand from "./routes/UpdateBrand";




function App() {
    return(
        <div className='container'>
            <Router>
                <Routes> {/*switch statement*/}
                    <Route exact path="/" Component={Home} />
                    <Route exact path="/brandRatings/:id/update" Component={UpdateBrand} />
                    <Route exact path="/brandRatings/:id" Component={BrandDetail} />
                </Routes>
                
            </Router>
        </div>
    )
};
export default App;