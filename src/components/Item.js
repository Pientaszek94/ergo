import React from 'react'
import { faker } from '@faker-js/faker';
function Item({item, users, phrase, BoldedText}) {
  return (
    <div className="post_item"
        style={{backgroundImage:`url(${faker.image.urlLoremFlickr({ category: 'nature' })})`}}>
        <div className='post_title'>
            {
                BoldedText?BoldedText(item.title, phrase):item.title
            }
            {
            users.filter((user)=>user.id===item.userId).map((user, index)=>(
                <h3 key={index}>
                    {user.name}
                </h3>
            ))
            }
        </div>
    </div>
  )
}

export default Item