import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DOMPurify from 'dompurify';

import './styles/home.css'

export function Home() {

    // const posts = [
    //   {
    //     id: 1,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //   },
    //   {
    //     id: 2,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //   },
    //   {
    //     id: 3,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //   },
    //   {
    //     id: 4,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //   },
    // ];

  const cat = useLocation().search

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(()=>{
      const fetchPosts = async()=>{
        try {
          const res = await axios.get(`/api/post${cat}`)
          setPosts(res.data)
          setLoading (false)
        } catch (error) {
          setLoading(false); 
          setError(error);
          console.log(error.response)
          console.error(error);
        }
      }
      fetchPosts()
    }, [cat])


    if (loading) {
      return <h1>Cargando...</h1>; 
    }

    if (error) {
      return <h1>Error: {error.message}</h1>; 
    }

    return (
      <main className="home">
        <section className="banner">
          <div className="content">
            <h1>¡Bienvenido al blog de Leonidas!</h1>
            <p>Blog de noticias desarrollado con React y Node.js. En este espacio, podrás compartir tus opiniones y noticias sobre una variedad de temas.</p>
          </div>
        </section>
        <section className="posts">
          {posts.length > 0 ? (
            <>
              {posts.map(post=>(
                <div className="post" key={post.id}>
                  <Link className="link" to={`/post/${post.id}`}>
                    <div className="img">
                      <img src={`./img/${post.img}`} alt="" />
                    </div>
                    <div className="content">
                      <div>
                        <h1>{post.title}</h1>
                        <p  className="date">Posted {moment(post.date).fromNow()} </p>
                      </div>
                      <div className="descip-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.descrip) }}></div>
                    </div>
                  </Link>
                </div>
              ))}
            </>
            ) : (
                <h1>No hay ningun posts</h1>
            )
          }
        </section>
      </main>
    )
  }