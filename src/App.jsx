
import './App.css'
import Register from './assets/Register'
import Login from './assets/Login'
import Profile from './assets/Profile'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
function App() {
  const router = createBrowserRouter([
    {
      path:"/myapp/",
      element: <Login/>
    },
    {
      path:"/myapp/register",
      element: <Register/>
    },
    {
      path:"/myapp/login",
      element: <Login/>
    },
    {
      path:"/myapp/profile",
      element: <Profile/>
    }
  ])
  return (
      <div>
        <RouterProvider router={router}/>
      </div>
  )
}
export default App

