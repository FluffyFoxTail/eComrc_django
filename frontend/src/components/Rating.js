import React from 'react'

const Rating = ({value, text, color}) => {

    const stars = []

    for (let i=0; i < 5; i++){
        stars.push(
            <span key={1+i}>
            <i style={{color}} className={
                value >= 1+i ? 'fa-solid fa-star'
                : value >= i+0.5 ? 'fa-solid fa-star-half-stroke'
                : 'far fa-star'
            }></i>
        </span>
        )
    }

  return (
    <div className='rating'>
        {stars}
            <br></br>
        <span>{text ? text : ''}</span>
    </div>
  )
}

export default Rating