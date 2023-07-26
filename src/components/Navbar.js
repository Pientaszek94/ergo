import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Results from './Results'

function Navbar({users, posts}) {
    const [isSearching, setIsSearching] = useState(false)
    const [phrase, setPhrase] = useState('')
    const navigate=useNavigate();

    const handleGlass=()=>{
        setIsSearching((prevState)=> !prevState)
        if(phrase){
            setPhrase("")
        }
    }

    const handleSubmit=(e)=>{
        if(!phrase){
            return
        }
        e.preventDefault()
        navigate(`/search/${phrase}`)
        setPhrase("")
        setIsSearching(false)
    }

  return (
    <header className='bg-yellow-200'>

        <nav>

            <Link to='/'>
                <h1>The Blog</h1>
            </Link>

            <div className='search-unit flex flex-row justify-center items-center'>

                <form onSubmit={handleSubmit} className='flex flex-row justify-center items-center'>
                        

                    <div className={`rounded-full overflow-x-hidden transition-all duration-700 ease-in-out ${isSearching?"w-44":"w-0"}`}>
                        <input value={phrase}
                            onChange={(e)=> setPhrase(e.target.value)} 
                            type="text" 
                            placeholder="Post title/Users Name" 
                            className='text-black bg-gray-200 pl-2 outline-none shadow-inner
                                         mx-2 h-8 rounded-full' />

                    </div>
                    {/* {
                        isSearching?
                        (<button disabled={!phrase} 
                                type="submit" 
                                className='bg-green-200 flex flex-row items-center'>
                            <span className="material-symbols-outlined text-green-400">search</span>
                        </button>):null
                    } */}
                </form>
                    {

                        !isSearching?(<button type="button"  className='flex flex-row items-center'>
                        <span className="material-symbols-outlined" onClick={handleGlass}>search</span>
                        </button>)
                        :(<button type="button"  className='flex flex-row items-center color-red-500'>
                        <span className="material-symbols-outlined" onClick={handleGlass}>close</span>
                        </button>)
                
                    }

            </div>
        </nav>
        {
            phrase&&
            <Results posts={posts} users={users} phrase={phrase}/>
        }
    </header>
  )
}

export default Navbar