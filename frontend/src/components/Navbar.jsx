import { Link } from "react-router-dom";
import { useUser } from "../context/authContext";

import './navfoo.css'

export function Navbar({logo}){

    const { user, logOut } = useUser();

    const handleDelete=()=>{
        const logout = async ()=>{
            try {
                await logOut()
                location.reload(true)
            } catch (error) {
                console.error("Error al cerrar sesion:", error);
            }
        }
        logout()
    }
   // console.log(user)

    return(
        <nav className="navbar">
            <header className="container">
                <div className="logo">
                    <Link to={"/"}><img src={logo} alt="logo" /></Link>
                </div>
                <ul className="links">
                    <li><Link className="link" to={"/?cat=art"}>ART</Link></li>
                    <li><Link className="link" to={"/?cat=videogame"}>Videojuegos</Link></li>
                    <li><Link className="link" to={"/?cat=technology"}>Tecnologia</Link></li>
                    <li><Link className="link" to={"/?cat=cinema"}>Cine</Link></li>
                    <li><Link className="link" to={"/?cat=food"}>Comidas</Link></li>
                </ul>
                    <ul className="userInfo">
                        {user ? (
                            <>
                            <li>
                                {user.profile 
                                    ?(<img src={user.profile} alt="" />)
                                    : (<img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png" alt="" />)
                                }
                                <span>{user?.name}</span>
                            </li>
                            <li>
                                <span onClick={handleDelete}>Cerrar sesion</span>
                            </li>
                            <li className="write">
                                <Link className="link" to={"/write"}>Escribir</Link>
                            </li>
                            </>
                        ) : (
                            <>
                            <li className="unlogin">
                                <Link className="regislogin" to={"/login"}>Iniciar sesion</Link>
                            </li>
                            <li className="unlogin">
                                <Link className="regislogin" to={"/login"}>Register</Link>
                            </li>
                            </>
                        )}
                </ul>
            </header>
        </nav>
    )
}