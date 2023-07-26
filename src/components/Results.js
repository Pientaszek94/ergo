import React, { Suspense } from 'react'
import { faker } from '@faker-js/faker';
import Loading from './Loading';
import { Link } from 'react-router-dom';
const Item = React.lazy(()=> import('./Item'))

function Results({posts, users, phrase=''}) {

 const filtered_users=users.filter((item)=> item.name.toLowerCase().includes(phrase.toLowerCase())) 
  const BoldedText=( text, shouldBeBold )=>{
    const textArray = text.split(shouldBeBold);
    return (
      <span>
        {textArray.map((item, index) => (
          <span key={index}>
            {item}
            {index !== textArray.length - 1 && (
              <b>{shouldBeBold}</b>
            )}
          </span>
        ))}
      </span>
  );
  }

  return (
    <div className='results'>
        <h2>Results</h2>
        <div className='grid grid-cols-2 gap-2'>
            <div className='min-h-fit'>
                <h3>Users</h3>
                {
                  filtered_users!=0?
                  filtered_users
                      .map((item, index)=>(
                            <div key={index} className='p-2 grid grid-cols-4 gap-1 shadow-lg my-2 flex flex-row items-center'>
                              <img src={faker.image.avatar()} alt="person" className='rounded-lg mr-2'/>
                              <div className='user_info'>
                                  <h4 className='text-center'>
                                  {
                                    BoldedText(item.name, phrase)
                                  }
                                  </h4>
                                  
                                  <h6>
                                    posts: {
                                      posts.filter((post)=> post.userId===item.id).length
                                    }
                                  </h6>
                            
                              </div>
                            </div>
                          ))
                  :<h4>No user has been found</h4>
                }
            </div>
            <div className='min-h-fit'>
                <h3>Posts</h3>
                {
                  posts.filter((item)=> item.title.toLowerCase().includes(phrase.toLowerCase()))!=0?
                  posts.filter((item)=> item.title.toLowerCase().includes(phrase.toLowerCase()))
                      .map((item, index)=>(
                          <Suspense key={index} fallback={<Loading/>}>
                            <Link to={`/posts/${item.id}`}>
                              <Item item={item} users={users} phrase={phrase} BoldedText={BoldedText}/> 
                            </Link>
                          </Suspense>
                          ))
                  :<h4>No post has been found</h4>
                }
            </div>
             
        </div>
    </div>
  )
}

export default Results