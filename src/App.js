import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "./redux/slices/postSlice";
import { fetchUsers } from "./redux/slices/userSlice";
import { Loading, Navbar, Error, Footer } from "./components";
import { Home, Post, ResultPage } from "./pages";


function App() {


  const usersStore=useSelector(state=> state.users)
  const postsStore=useSelector(state=> state.posts)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(!usersStore.users.length && !postsStore.posts.length){
      dispatch(fetchPosts())
      dispatch(fetchUsers())
    }
  },[])

  // Destructuring all Stores to get lists of users and posts
  const {users}=usersStore;
  const {posts}=postsStore;

  return (

    <div className="App">

      {/* Below You can see dependencies which will trigger exact instruction if something goes bad
          If not, whole web app will render after Loading screen */}

      {postsStore.loading&&usersStore.loading?(
        <div className="w-full h-screen flex-center-center">
          <Loading/>
        </div>
      ):null}
      {(!postsStore.loading && postsStore.error)&&(!usersStore.loading && usersStore.error)? <Error/>: null}
      {!postsStore.loading && postsStore.posts.length?(
        <BrowserRouter className="relative">
          <Navbar posts={posts} users={users}/>

          <main className="container m-auto mt-2">
            <Routes>
              <Route path="/" exact element={<Home posts={posts} users={users}/>}/>
              <Route path="/search/:searched_phrase" element={<ResultPage posts={posts} users={users}/>}/>
              <Route path="/posts/:postId" element={<Post posts={posts} users={users}/>}/>
            </Routes>
          </main>
          <Footer/>
        </BrowserRouter>
        
      ):null}

    </div>
  );
}

export default App;
