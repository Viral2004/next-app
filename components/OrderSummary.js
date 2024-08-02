"use client"
import { useState,useEffect } from 'react';
import { fetchStoreItemData } from '@/action/signUpAction';
import { useSession } from 'next-auth/react'

function OrderSummary() {
  const { data: session } = useSession()
   const [items, setItems] = useState([])
   const [totalAmount, setTotalAmount] = useState();

   useEffect(() => {
      if (session) {
         getData()
      }
    
   }, [session])
   
   

   const getData = async() => {
      let res = await fetchStoreItemData(session.user.email)
      
      setItems(res)
       
   
     
      
    }
    useEffect(() => {
     
      if (items.length > 0) {
        const amount = items.reduce((acc, current) => acc + parseInt(current.amount), 0);
        setTotalAmount(amount);
      } else {
        setTotalAmount(0);
      }
    }, [items])
    
  

   


  return (

    <div className="bg-white  shadow-md rounded px-8 py-6">
     
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      <ul>
        <li className="flex justify-between mb-2">
          <span>Original price:</span>
          <span className="font-bold">{totalAmount}</span>
        </li>
        <li className="flex justify-between mb-2">
          <span>Savings:</span>
          <span className="font-bold">0</span>
        </li>
        <li className="flex justify-between mb-2">
          <span>Store Pickup:</span>
          <span className="font-bold">0</span>
        </li>
        <li className="flex justify-between mb-2">
          <span>Tax:</span>
          <span className="font-bold">0</span>
        </li>
      </ul>
      <h3 className="text-lg font-bold mb-4">Total: <span className="font-bold">{totalAmount}</span></h3>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Proceed to Checkout</button>
      <p className="text-sm">or <a href="#" className="text-blue-600 hover:text-blue-800">Continue Shopping</a></p>
    </div>
  );
}

export default OrderSummary;