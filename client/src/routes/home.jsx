import React from 'react'
import Header from "../components/Header";
import AddBrand from "../components/AddBrand";
import BrandList from "../components/BrandList";

function home() {
  return (
    <div>
      <Header />
      <AddBrand />
      <BrandList />
    </div>
  )
}

export default home