import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";  //npm install react-router-dom before run this code
import Home from "./routes/Home";
import BrandDetailPage from "./routes/BrandDetailPage";
import UpdatePage from "./routes/UpdatePage";
import BrandsContextProvider from "./context/BrandsContext";



function App() {
    return(
        <BrandsContextProvider>
            <div className='container'>
                <Router>
                    <Routes> {/*switch statement*/}
                        <Route exact path="/" Component={Home} />   {/*call <Home/> when access to path "/" */}
                        <Route exact path="/brandRatings/:id/update" Component={UpdatePage} />   {/*call <UpdatePage/> when access to path "/brandRatings/:id/update" */}
                        <Route exact path="/brandRatings/:id" Component={BrandDetailPage} />
                    </Routes>                  
                </Router>
            </div>
        </BrandsContextProvider>
        
    )
};
export default App;