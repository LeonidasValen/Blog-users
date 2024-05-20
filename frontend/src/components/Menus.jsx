import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './menu.css';

export function Menu({ cat, idPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/menu/?cat=${cat}&exclude=${idPost}`);
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.status === 404
          ? '404 No se encontró el post'
          : '500 Error interno del servidor'
      );
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [cat, idPost]);

  const handleLinkClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (error) {
    return (
      <aside className="menu">
        <h1>Error: {error}</h1>
      </aside>
    );
  }

  return (
    <aside className="menu">
      <h1>Otros posts que te pueden interesar:</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <Link to={`/post/${post.id}`} onClick={() => handleLinkClick(post.id)}>
              <img src={`.././img/${post.img}`} alt="" />
              <h2>{post.title}</h2>
              <span> Leer más</span>
            </Link>
          </div>
        ))
      ) : (
        <p>No hay contenido relacionado o hubo un error</p>
      )}
    </aside>
  );
}
