import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setViewBook } from '../reduxStore/main.slice'
import Rating from './rating.component'

function CategoryBar(props) {
    let books=useSelector(state=>state.main.books)
    let navig=useNavigate()
    let dispatch=useDispatch()

    const handleViewBook=(book)=>{
        dispatch(setViewBook(book))
        navig('/viewbook')
    }

  return (
    <div className='row pb-4'>
        <div className='row pb-3'>
            <div className="col-md-2 h3">{props.category}</div>
            <div className="col-md-10"><hr/></div>
        </div>
        {books&&books.filter(props.bookFilter).filter(book=>book.category==props.category)
        .map(book=>(
            <div className='col-2 pb-3' onClick={()=>handleViewBook(book)}>
                <div className='card'>
                <div className='p-4'>
                    <div><img src={book.image} height="200px" width="150px" alt={book.title+"_image"}/></div>
                    <div className='pt-2'>{book.title.slice(0,10)}</div>
                    <div><Rating rating={book.rating}/></div>
                </div>
            </div>
            </div>
        ))}
    </div>
  )
}

export default CategoryBar