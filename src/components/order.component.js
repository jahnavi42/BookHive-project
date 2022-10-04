import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder, getAllOrders, setCartItems, showMsg, toggleDisplayMode, updateOrder } from '../reduxStore/main.slice'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import Cart from './cart.component'


function Order() {
  let dispatch=useDispatch()
  const [id,setId]=useState(null)
  const [curBooks,setCurBooks]=useState(null)
  let navig=useNavigate()
  let orders=useSelector(state=>state.main.order)
  let isAdmin=useSelector(state=>state.main.isAdmin)


  const handleViewOrder=(id)=>{
    let orderToView=orders.find(order=>order.id==id)
    console.log(orderToView)
    setCurBooks(orderToView.books)
    setId(orderToView.id)
    // dispatch(setCartItems(orders.find(order=>order.id==id).books))
  }

  const handleCancelOrder=(id)=>{
    dispatch(cancelOrder({id:id}))
    dispatch(showMsg({msg:"order cancelled",type:"info"}))
  }

  const handleAcceptOrder=(id)=>{
    dispatch(updateOrder({id:id,newStatus:"success"}))
    dispatch(showMsg({msg:"Order accepted",type:"success"}))
  }

  const handleRejectOrder=(id)=>{
    console.log(typeof id)
    dispatch(updateOrder({id:id,newStatus:"rejected"}))
    dispatch(showMsg({msg:"Order Rejected",type:"success"}))
  }

  useEffect(()=>{
    dispatch(getAllOrders())
    console.log(orders)
  },[])

  return (
    <div className='row'>
      {id&&curBooks&&<Cart orderMode={true} cartItems={curBooks}/>}
      {orders.length>0&&<div  className='h3 pt-3'>
        {!isAdmin&&<div>YOUR ORDERS</div>}
        {isAdmin&&<div>CUSTOMER ORDERS</div>}
      </div>}
      <div className="col">
        {!orders.length>0&&<div className='h3 text-secondary p-4'>No orders</div>}
        {orders.map(({id,status,books,placedBy,total,address,paymentInfo})=>(
          <div className="col">
            <div className={"mt-2 order-elem order-"+status}>
              <div className="col">
                <div className="col pt-2 pb-3" >
                  <div className="col-md-6 h4">Order id  {id}</div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <img src={books[0].image} height="150px" width="100px"/>
                    </div>
                    <div className="col-md-4 h3" style={{textAlign:"left"}}>
                      <div className="col" >items: {books.length}</div>
                      <div className="col">total: {total}</div>
                      <div className="col">status: {status}</div>
                      <div className="col">orderer: {placedBy}</div>
                    </div>
                    <div className="col-md-4 h3">
                      <div>
                        Address<br/><textarea cols="20" rows="5" style={{resize:"none"}} readOnly="true" value={address} /><br/>
                      </div>
                      <div>
                        Payment<br/>{paymentInfo.type}<br/>
                      </div>
                    </div>
                    <hr/>
                    {!isAdmin&&<div className="row">
                    <div className="col pt-2">
                        <button className='btn btn-primary' 
                        style={{width:"80%"}} 
                        onClick={e=>handleViewOrder(id)}>View order</button>
                      </div>
                      <div className="col pt-2">
                        <button className='btn btn-primary' 
                        style={{width:"80%"}} 
                        onClick={e=>handleCancelOrder(id)}>Cancel order</button>
                      </div>
                    </div>}
                    {isAdmin&&<div className="row">
                    <div className="col pt-2">
                        <button className='btn btn-primary' 
                        style={{width:"80%"}} 
                        onClick={e=>handleAcceptOrder(id)}>Accept order</button>
                      </div>
                      <div className="col pt-2">
                        <button className='btn btn-primary' 
                        style={{width:"80%"}} 
                        onClick={e=>handleRejectOrder(id)}>Reject order</button>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order