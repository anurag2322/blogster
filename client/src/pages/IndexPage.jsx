import { useEffect, useState } from 'react'
import Post from '../Posts'
export default function IndexPage(){
    const [posts,setposts]=useState([])
    useEffect(()=>{
        fetch('http://localhost:4000/post')
        .then(response =>{
            response.json().then(posts=>{
                setposts(posts)
            })
        })
    },[])
    return(
        <>
            
            {posts.length > 0 && posts.map(post =>(
                <Post {...post} />
            ))}
        </>
    )
}