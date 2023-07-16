import { Link } from "react-router-dom"
export default function Post({_id,title,summary,cover,content,createdAt,author}){
  
    return(
        <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/'+cover} alt="" />
          </Link>
        </div>
        <div className="texts">
        <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
        </Link>
            <p className="info">
              <a href="" className="author">{author.username}</a>
              <time>{createdAt}</time>          
            </p>
            <p>{summary}</p>

        </div>
      </div>
    )
}
// mongodb+srv://anuragpande66:anurag2322@cluster0.nykh9tv.mongodb.net/
