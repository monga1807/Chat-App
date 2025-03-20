import './App.css'
import Register from './assets/Register'
import Login from './assets/Login'
import Profile from './assets/Profile'
// import AddImage from './assets/profilecom/AddImage'
// import './Firebase'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Login/>
    },
    {
      path:"/register",
      element: <Register/>
    },
    {
      path:"/login",
      element: <Login/>
    },
    {
      path:"/profile",
      element: <Profile/>
    }
  ])
  return (
    <>
      <div>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
