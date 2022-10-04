import axios from "axios";
const baseUrl="http://127.0.0.1:5000"

const makeGetReq=(url)=>{
    return axios.get(baseUrl+url)
}

const makePostReq=(url,data)=>{
    // return axios.post(baseUrl+url,{data:data})
    return axios.post(baseUrl+url,data)
}

export const httpGetBooks=()=>{
    return makeGetReq('/book/getbooks')
}

export const httpAddBook=(newBook)=>{
    return makePostReq('/book/addbook',newBook)
}

export const httpUpdateBook=(bkTitle,modBook)=>{
    return makePostReq('/book/updatebook',{title:bkTitle,book:modBook})
}

export const httpDeleteBook=(title)=>{
    return makePostReq('/book/deletebook',{title:title})
}

export const httpGetOrders=()=>{
    return makeGetReq('/order/getorders')
}

export const httpGetOrdersOfUser=(username)=>{
    return makeGetReq('/order/getorderuser/'+username)
}

export const httpUpdateOrderStatus=(orderId,status)=>{
    return makePostReq('/order/updateorder',{id:orderId,status:status})
}

export const httpPlaceOrder=(cartBooks,total,placedBy,address,paymentInfo)=>{
       let newOrder={
            books:cartBooks,
            total:total,
            status:"pending",
            placedBy:placedBy,
            address:address,
            paymentInfo:paymentInfo
        }
        return makePostReq('/order/placeorder',{...newOrder})
}


export const httpCancelOrder=(id)=>{
    return makePostReq("/order/cancelorder",{id:id})
}

export const httpValidateLogin=(username,password)=>{
    return makePostReq("/user/validate",{username:username,password:password})
}

export const httpRegisterUser=(username,password)=>{
    return makePostReq("/user/register",{username:username,password:password})
}

