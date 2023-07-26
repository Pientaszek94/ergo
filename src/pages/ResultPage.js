import React, {Suspense, useState, useMemo} from 'react'
import { faker } from '@faker-js/faker';
import { Link, useLocation, useParams } from 'react-router-dom'
import { Loading, Pagination } from '../components';
const Item = React.lazy(()=> import('../components/Item'))


function ResultPage({users, posts}) {

    let pageSize=10;
    const location=useLocation();

    const {searched_phrase}=useParams();
    
    const [currentPage, setCurrentPage] = useState(1)
    const filtered_users= searched_phrase?users.filter((item)=> item.name.toLowerCase().includes(searched_phrase.toLowerCase())):users;
    const filtered_posts=searched_phrase?posts.filter((item)=> item.title.toLowerCase().includes(searched_phrase.toLowerCase())):posts;

    const currentPageData= useMemo(()=>{

        const firstPageIndex=(currentPage-1)*pageSize;
        const lastPageIndex=firstPageIndex+pageSize;

        return filtered_posts.slice(firstPageIndex, lastPageIndex);
    },[currentPage, filtered_posts])

    const currentUsers= useMemo(()=>  filtered_users.map((item, index)=>(
        <div key={index} className='p-2 grid grid-cols-1 md:grid-cols-4 md:gap-1 shadow-lg my-2 flex flex-row items-center'>
          <img src={faker.image.avatar()} alt="person" className=' rounded-lg'/>
          <div className='user_info'>
              <h4 className='text-center'>
              {
                item.name
              }
              </h4>
              <h6>
                posts: {
                    posts.filter((post)=> post.userId===item.id).length
                }
              </h6>
          </div>
        </div>
      )),[filtered_users])

  return (
    <div className={`result_page ${location.pathname=="/"?"flex flex-col-reverse items-center":null}`}>
        {location.pathname!=="/"&&<h2 className='my-2'>These are the results of search results of "<i>{searched_phrase}</i>"</h2>}
            {filtered_users!=0?(
                <div className='users_rp'>
                    <h2 className='flex-center-center'>Users</h2> 
                        {currentUsers}
                </div>
                ):<h2 className=''>No User sounds like that</h2>}
        
        <div className='w-full mt-32 mb-12'>
                {
                    filtered_posts!=0?(
                        <div className='posts_rp'>
                            <div className='flex-center-center'>
                                <h2 className='flex-center-center'>Posts</h2>
                                {/* <label htmlFor="pageSize" className='flex-center-center bg-yellow-200'>
                                    in one page: {pageSize}
                                    <input type="range" name="pageSize" id="pageSize" onChange={(e)=>setPageSize(e.target.value)} step={1} min={4} max={20} />
                                </label> */}
                            </div>
                            <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={filtered_posts.length}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)} />
                            {
                            currentPageData
                                .map((item, index)=>(
                                    <Suspense key={index} fallback={<Loading/>}>
                                        <Link to={`/posts/${item.id}`}>
                                            <Item item={item} users={users} phrase={searched_phrase}/> 
                                        </Link>
                                    </Suspense>
                                    ))
                        
                            }

                            <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={filtered_posts.length}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    )
                    :<h2>No Post found</h2>
                }
        </div>
    </div>
  )
}

export default ResultPage