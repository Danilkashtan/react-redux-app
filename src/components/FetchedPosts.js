import React from 'react'
import Post from "./Post";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../redux/actions";
import {LoadingSpinner} from "./LoadingSpinner";


export default () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.fetchedPosts)
  const loading = useSelector(state => state.app.loading)
  if (loading) {
    return <LoadingSpinner />
  }
  if (!posts.length) {
    return <button
        disabled={loading}
        onClick={() => dispatch(fetchPosts())}
        className="btn btn-primary"
    >{!loading ? 'Загрузить' : 'Загружается'}</button>
  }
  return posts.map(post => <Post post={post} key={post.id}/>)
}

