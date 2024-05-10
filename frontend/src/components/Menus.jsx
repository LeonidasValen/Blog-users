import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'
import './menu.css'

export function Menu({cat, idPost}){

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
      const fetchPosts = async()=>{
        try {
          const res = await axios.get(`/api/menu/?cat=${cat}&exclude=${idPost}`)
          
          setPosts(res.data)
          setLoading (false)
        } catch (error) {
          setLoading(false); 
          setError(error);
          console.error(error.message)
          //console.error(error);
        }
      }
      fetchPosts()
    }, [cat])

    if (loading) {
      return <h1>Cargando...</h1>; 
    }

    if (error) {
      return <aside className='menu'> <h1>Error: {error.message}</h1></aside>; 
    }

    return(
        <aside className="menu">
            <h1>Otros post que te pueden intersar:</h1>
            {posts ? (
              posts.map(post => (
                <div className='post' key={post.id}>
                  <Link to={`/post/${post.id}`}>
                    <img src={`.././img/${post.img}`} alt="" />
                    <h2>{post.title}</h2>
                    <span> Leer más</span>
                  </Link>
                </div>
              ))
              ) : (
              <p>No hay contenido relacionado</p>
            )}
        </aside>
    )
}