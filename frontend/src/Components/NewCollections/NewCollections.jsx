import React, { useEffect, useState } from 'react';
import new_collections from '../Assets/new_collections';
import Item from '../Item/Item';
import './NewCollections.css';
const NewCollections = () => {
  const [new_collection,setNew_collection]=useState([]);
  useEffect(()=>{
fetch('https://e-commerce-website-7zdw.onrender.com/newcollections').then((resp)=>resp.json()).then((data)=>setNew_collection(data));
  },[])
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {
                new_collections.map((item,i)=>{
                    return <Item     key={i} id={item.id} name={item.name} image={
                        item.image} new_price={item.new_price} old_price={item.old_price}   />
                })
                
            }
        </div>
    </div>
  )
}

export default NewCollections