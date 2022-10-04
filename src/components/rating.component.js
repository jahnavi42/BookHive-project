import React from 'react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'

function Rating({rating}) {
  return (
    <div>
      {new Array(rating).fill(0).map(a=><AiFillStar/>)}
      {rating<5&&new Array(5-rating).fill(0).map(a=><AiOutlineStar/>)}
    </div>
  )
}

export default Rating