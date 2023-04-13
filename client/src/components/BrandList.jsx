import React from 'react'

const BrandList = () => {
  return (
    <div className='list-group'>
        <table class="table table-dark table-hover">
            <thead>
                <tr className='bg-info'>
                    <th scope="col">Brand</th>
                    <th scope="col">Description/Category</th>
                    <th scope="col">Price range</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>   
                    <th scope="row">Lulus</th>
                    <td>Lulus</td>
                    <td>Lulus</td>
                    <td>Lulus</td>
                    <td><button className="btn btn-secondary">Update</button></td>
                    <td><button className="btn btn-secondary">Delete</button></td>
                </tr>
                <tr>
                    <th scope="row">Lulus</th>
                    <td>Lulus</td>
                    <td>Lulus</td>
                    <td>Lulus</td>
                    <td><button className="btn btn-secondary">Update</button></td>
                    <td><button className="btn btn-secondary">Delete</button></td>
                </tr>
            </tbody>
        </table>

    </div>
  )
}

export default BrandList