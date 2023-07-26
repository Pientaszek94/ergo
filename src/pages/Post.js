import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom'

function Post({posts, users}) {

    const {postId}=useParams();
    const [post, setPost] = useState([])
    const [user, setuser] = useState([])
    useEffect(()=>{
        setPost(posts.filter((item)=> item.id==postId))
        
    },[])
    useEffect(()=>{
        if(post[0]){
            setuser(users.filter((item)=> item.id==post[0]?.userId))
        }
    },[post])
  return (
    <div className='min-h-screen mt-0'>
        {
            post[0]&&(
                <div className='w-full h-4/5 bg-no-repeat bg-cover bg-left bg-fixed flex-center-center' 
                style={{backgroundImage:`url(${faker.image.urlLoremFlickr({ category: 'nature' })})`}}>
                    <h2 className='my-44 mix-blend-difference text-white text-4xl flex-center-center'>
                        {post[0]?.title.charAt(0).toUpperCase()+post[0]?.title.slice(1)}
                    </h2>
                    <h2>
                        {user[0]?.name}
                    </h2>

                </div>
            )
        }
        <div className='h-4/5'>
            {post[0]&&(
                <p className='mt-10 p-2 text-justify'>
                    {post[0].body.charAt(0).toUpperCase()+post[0].body.slice(1)}
                </p>
            )}
        </div>
    </div>
  )
}

export default Post