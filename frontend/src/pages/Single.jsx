import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import moment from "moment";
import { Menu } from '../components/Menus'
import DOMPurify from 'dompurify';
import { useUser } from '../context/authContext';

import './styles/single.css'

export function Single() {
  axios.defaults.withCredentials = true;
  const {user} = useUser() 
  const navigate = useNavigate()
  
  const { id } = useParams();// obtiene el id de la url
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userOwner = user && user.id === post.uid;
  
  useEffect(()=>{
    const fetchPosts = async()=>{
      try {
        const res = await axios.get(`/api/post/${id}`);
        setPost(res.data)
        setLoading(false)
      } catch (error) {
        //console.error(error);
        setLoading(false)
        setError(error.response?.status === 404 ? '404 No se encontro el post' : '500 Error interno del servidor');
      }
    }
    fetchPosts()
  }, [id]);

  const deletePost = async (id) => {
    try {
        const res =await axios.delete(`/api/post/${id}`);
        console.log(res)
        navigate("/")
    } catch (error) {
        setError(error.response.data);
        console.error("Error al borar el post",error);
    }
};

  if (loading) {
    return <h1>Cargando...</h1>; 
  }

  if (error) {
    return (
    <main className="single">
      <div className='content'>
        <h1>Error {error}</h1>
      </div>
      <Menu/>
    </main>)
  }

    return (
      <main className="single">
        <div className="content">
          <img src={`.././img/${post.img}`} alt="" />
          <div className='user'>
            {post.userImg 
              ?(<img src={post.userImg} alt="" />)
              : (<img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png" alt="" />)
            }
            <div className="info">
              <span>{post.name}</span>
              <p>Posted {moment(post.date).fromNow()} </p>
            </div>

            {userOwner && (    
              <div className="edit">
                <Link to={`/write?edit=${post.id}`} state={post}>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" />
                  </svg>
                </Link>
                <button onClick={() => deletePost(post.id)}>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
              )
            }
            
          </div>        
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.descrip) }}>
          </div>
        </div>
        <Menu cat={post.cat} idPost={post.id}/>
      </main>
    )
}