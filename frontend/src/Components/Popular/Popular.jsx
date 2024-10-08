import React, { useEffect, useState } from 'react';
import './Popular.css';
// import data_product from '../Assets/data.js';
import Item from '../Item/Item';
const Popular = () => {
    const [popularProducts,SetPopularProducts]=useState([]);
    useEffect(()=>{
fetch('https://e-commerce-website-7zdw.onrender.com/popularinwomen').then((resp)=>resp.json()) .then((data)=>SetPopularProducts(data));
    },[])
    return (
        <div className=' Popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popularProducts.map((item, i) => {
                    return (<Item key={i} id={item.id} name={item.name} image={
                        item.image} new_price={item.new_price} old_price={item.old_price} />)
                })}
            </div>

        </div>
    )
}

export default Popular