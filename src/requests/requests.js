import axios from "axios";

import demoData from './data/demoDataWDesc.json'
import demoDataOrders from './data/demoOrderData.json'

const baseUrl="http://ServerUrlhere"

const isProd=false

let demoBooks=demoData

let demoUsers=[
    {username:"admin",password:"admin"},
    {username:"jahnavi",password:"jahnavi"},
    {username:"dharshini",password:"dharshini"}
]

// book=>


// order => id, status 

// create an orders array here!
let demoOrders=demoDataOrders

const loadOrdersFromLocal=()=>{
    let orders=localStorage.getItem('orders')
    if(orders)
        demoOrders=JSON.parse(orders)
    else
        localStorage.setItem('orders',JSON.stringify(demoOrders))
    console.log(demoOrders)
}

const loadBooksFromLocal=()=>{
    let books=localStorage.getItem('books')
    if(books)
        demoBooks=JSON.parse(books)
    else
        localStorage.setItem('books',JSON.stringify(demoBooks))
}

const loadUsersFromLocal=()=>{
    let users=localStorage.getItem('users')
    if(users)
        demoUsers=JSON.parse(users)
    else
        localStorage.setItem('users',JSON.stringify(demoUsers))
}

const updateLocalStore=()=>{
    localStorage.setItem('orders',JSON.stringify(demoOrders))
    localStorage.setItem('books',JSON.stringify(demoBooks))
    localStorage.setItem('users',JSON.stringify(demoUsers))
}

loadOrdersFromLocal()
loadBooksFromLocal()
loadUsersFromLocal()

const promiseCreator=(data)=>{
    return new Promise((resolve,reject)=>{
        resolve(data)
    })
}

const makeGetReq=(url)=>{
    return axios.get(baseUrl+url)
}

const makePostReq=(url,data)=>{
    return axios.post(baseUrl+url,{data:data})
}

export const httpGetBooks=()=>{
    if(!isProd){
        console.log("waas here")
        return promiseCreator(demoBooks)
    }else{
        // add route here
        return makeGetReq('/getBooks')
    }
}

export const httpAddBook=(newBook)=>{
    if(!isProd){
        console.log("add boook pinged")
        demoBooks.push(newBook)
        updateLocalStore()
        return promiseCreator({status:"success"})
    }else{
        // check if same title exists on backend!
        //  and return appropriately
        return makePostReq('/addbook',newBook)
    }
}

export const httpUpdateBook=(bkTitle,modBook)=>{
    // modifying a book means
    // the title will be fixed anything else can be changed
    // so use modBook.title to access it and set the new values there

    if(!isProd){
        console.log("modBoook pinged")
        demoBooks=demoBooks.map(book=>{
            if(book.title==bkTitle)
            return modBook
            return book
        })
        console.log(demoBooks)
        updateLocalStore()
        return promiseCreator({status:"success"})
    }else{
        return makePostReq('/updatebook',modBook)
    }
}

export const httpDeleteBook=(title)=>{
    if(!isProd){
        demoBooks=demoBooks.filter(book=>book.title!=title)
        updateLocalStore()
        return promiseCreator({status:"success"})
    }else{
        return makePostReq('/deletebook',{title:title})
    }
}

export const httpGetOrders=()=>{
    if(!isProd){
        return promiseCreator(demoOrders)
    }else{
        return makeGetReq('/getorders')
    }
}

export const httpGetOrdersOfUser=(username)=>{
    if(!isProd){
        console.log("err")
        console.log(username)
        demoOrders.sort((a,b)=>b.id-a.id)
        return promiseCreator(demoOrders.filter(order=>order.placedBy==username))
    }else{
        return makeGetReq('/getorder/'+username)
    }
}

export const httpUpdateOrderStatus=(orderId,status)=>{
    // status is default set to "pending" when order is made
    // admin can do "success" or "failure" on the admin portal
    // here it is true:succes and false:failure

    if(!isProd){
        console.log("status change"+status)
        let changeOrder=demoOrders.find(o=>o.id==orderId)
        changeOrder.status=status
        demoOrders=demoOrders.filter(order=>order.id!=orderId)
        demoOrders.push(changeOrder)
        // demoOrders.
        // demoOrders=demoOrders.map(order=>{
        //     if(+order.id==+orderId){
        //         order.status=status?"success":"rejected"
        //     }
        //     return order
        // })
        // let changeInd=demoOrders.findIndex(o=>o.id==orderId)
        // console.log(changeInd)
        // demoOrders[changeInd].status=status?"success":"rejected"
        // console.log(demoOrders)

        // demoOrders=demoOrders.map(order=>{return({...order,status:"success"})})
        updateLocalStore()
        return promiseCreator({status:"success"})
    }else{
        return makePostReq('/updateorder',{orderId:orderId,status:status})
    }
}

export const httpPlaceOrder=(cartBooks,total,placedBy,address,paymentInfo)=>{
    // a
    console.log(cartBooks)
    console.log("Place order req!")
    if(!isProd){
        let newOrder={
            id:Date.now(),
            books:cartBooks,
            total:total,
            status:"pending",
            placedBy:placedBy,
            address:address,
            paymentInfo:paymentInfo
        }
        console.log("New Order"+" "+JSON.stringify(newOrder))
        console.log(JSON.stringify(newOrder))
        demoOrders.push(newOrder)
        updateLocalStore()
        return promiseCreator({status:"success",id:newOrder.id})
    }else{
        let newOrder={
            books:cartBooks,
            total:total,
            status:"pending",
            placedBy:placedBy,
            address:address,
            paymentInfo:paymentInfo
        }
        // backend must generate id for the object and return it in response
        return makePostReq('/placeorder',{order:newOrder})
    }
}


export const httpCancelOrder=(id)=>{
    if(!isProd){
        demoOrders=demoOrders.filter(order=>order.id!=id)
        updateLocalStore()
        return promiseCreator({status:"success"})
    }else{
        return makePostReq("/cancelorder",{id:id})
    }
}

export const httpValidateLogin=(username,password)=>{
    if(!isProd){
        let ifExists=demoUsers.find(user=>user.username==username&&user.password==password)
        let returnObj={status:ifExists?"success":"invalid",isAdmin:username=="admin"}
        return promiseCreator(returnObj)
    }else{
        return makePostReq("/validate",{username:username,password:password})
    }
}

export const httpRegisterUser=(username,password)=>{
    if(!isProd){
        // push user to the user demo array maybe????
        demoUsers.push({username:username,password:password})
        updateLocalStore()
        return promiseCreator({status:"success"})
    }else{
        return makePostReq("/registeruser",{username:username,password:password})
    }
}

