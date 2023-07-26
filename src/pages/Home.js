import React from 'react'
import { FakeCarousel } from '../components'
import ResultPage from './ResultPage'

function Home({users, posts}) {
  return (
    <div>
      <FakeCarousel/>
      <ResultPage posts={posts} users={users}/>
    </div>
  )
}

export default Home