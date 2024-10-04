import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Admin.css'
import { Route, Routes } from 'react-router-dom'
import ListProduct from '../../Components/ListProduct/ListProduct'
import AddProduct from '../../Components/AddProduct/AddProduct'
const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
    <Routes>
        <Route path='/addproduct' element={<AddProduct />}/>
        <Route path='/listproduct' element={<ListProduct />}/>
    </Routes>
    </div>
  )
}

export default Admin




