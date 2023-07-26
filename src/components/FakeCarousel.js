import React, { useState } from 'react'
import { faker } from '@faker-js/faker';
function FakeCarousel() {
    const slides=[
        {text:"This"},
        {text:"Is"},
        {text:"Fake"},
        {text:"Slider"}
    ]
  return (
    <div className='fake_carousel'>
        <div className='slides_container' style={{marginLeft:`22%`, marginRight:`22%`}}>
            {
                slides.map((slide, index)=>(
                    <div className='slide' key={index} style={{backgroundImage:`url(${faker.image.urlLoremFlickr({ category: 'nature' })})`}}>
                        <h2>
                            {slide.text}
                        </h2>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default FakeCarousel