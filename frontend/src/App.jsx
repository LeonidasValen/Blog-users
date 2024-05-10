import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter,Outlet} from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/register-login/Login';
import { Single } from './pages/Single';
import { Register } from './pages/register-login/Register';
import { Write } from './pages/Write';
import { Error } from './pages/Error';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import logo from '../public/icons/logo.png'
const Layout = ()=>{
  return(
    <>
      <Navbar logo={logo}/>
      <Outlet/>
      <Footer logo={logo}/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/post/:id",
        element: <Single/>
      },
      {
        path: "/write",
        element: <Write/>
      },
    ]
  },
  {
    path: "/register",
    element: <Register logo={logo}/>,
  },
  {
    path: "/login",
    element: <Login logo={logo}/>,
  },
  {
    path: "*",
    element: <Error/>,
  },
])

export function App() {

  return (
      <div className='container'>

        <RouterProvider router={router}/>

      </div>
  )
}

