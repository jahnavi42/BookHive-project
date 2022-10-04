import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BsPlusCircle,BsFileEarmarkImage} from 'react-icons/bs'
import {MdHideImage} from 'react-icons/md'
import { saveBook, showMsg } from '../reduxStore/main.slice'

function AddBook(props) {

  const dispatch=useDispatch()

  let modify=props.modify
  let loadBook=useSelector(state=>state.main.viewingBook)
  let initBookState={
    "title": "",
    "author":"",
    "published":"",
    "category":"",
    "price":0,
    "stock": 0,
    "rating": 0,
    "desc": "",
    "image":""
  }
  let [tempBook,setTempBook]=useState(
    loadBook&&modify?{...loadBook}:{...initBookState}
  )

  // saving this bcoz it acts as a key for the old book record
  // BUG : this changes reactively hence won't work
  // let originalTitle=tempBook.title.slice()
  let [originalTitle,setOriginalTitle]=useState(tempBook.title)
  console.log("ordiginal title is "+originalTitle)
  

  const handleFieldChange=(e,fieldName,prevValue)=>{
    let modTemp={...tempBook}
    // modTemp[fieldName]=typeof prevValue!="number"?e.target.value:parseInt(e.target.value)
    modTemp[fieldName]=e.target.value
    setTempBook(modTemp)
  }

  const handleAddImage=()=>{

  }

  const handleSaveBook=()=>{

    console.log({
      modTitle:originalTitle!=''?originalTitle:tempBook.title,
      modBook:tempBook
    })
    if(tempBook.title==''){
      dispatch(showMsg({msg:"Title required",type:"error"}))
      return 
    }
    dispatch(saveBook({
      // modTitle:originalTitle!=''?originalTitle:tempBook.title,
      modTitle:originalTitle!=''?originalTitle:tempBook.title,
      modBook:{
        ...tempBook,
        published:+tempBook.published,
        price:+tempBook.price,
        stock:+tempBook.stock,
        rating:+tempBook.rating
      },
      modified:modify
    }))
    if(!modify)
      setTempBook({...initBookState})
  }

  return (
    <div className="d-flex flex-column">
      <div className="card p-3" style={{margin:"50px 200px"}}>
      <div className="d-flex justify-content-center h1">{modify?"Edit Book":"Add Book"}</div>
      <div className="row">
        <div className="col-md-3" style={{marginLeft:"8%"}}>
          {tempBook.image?.length>0&&
            <div className="row pb-3">
              <img src={tempBook.image} height="500px" width="150px" alt="Invalid Url"/>
            </div>}
          {!tempBook.image?.length>0&&
            <div style={{color:'lightgray'}}>
              <h3>Add Image Url<br/>to Preview</h3>
              <BsFileEarmarkImage style={{height:"500px",width:"300px",color:"lightgray"}}/>
            </div>
          }
        </div>
        <div className="col-md-6" style={{marginLeft:"10%"}}>
          {tempBook&&Object.entries(tempBook).map(([fieldName,fieldValue])=>(
            <div className="col pb-2">
                <h3 align="left">{fieldName=="desc"?"description":fieldName}</h3>
                <input 
                  className="form-control" 
                  type="text" id={fieldName} 
                  value={fieldValue}
                  onChange={e=>handleFieldChange(e,fieldName,fieldValue)}
                />
            </div>
          ))}
          <button className='btn btn-primary' onClick={handleSaveBook}>Save</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AddBook