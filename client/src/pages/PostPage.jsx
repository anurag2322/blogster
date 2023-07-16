import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../UserContext";

export default function PostPage(){
    const [postInfo,setPostInfo] = useState(null);
    const {userinfo}=useContext(UserContext)
    const {id} = useParams();
    useEffect(() => {
      fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
          response.json().then(postInfo => {
            setPostInfo(postInfo);
          });
        });
    }, []);
    if(!postInfo) return ' '
    
    return(
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{postInfo.createdAt}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userinfo.id===postInfo.author._id && (
                <div className="edit-row">
                    <Link to={`/edit/${postInfo._id}`} className="edit-btn">Edit this Post</Link>
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    )
}