// import * as react from 'react'
import BasicExample from './Navbar'
import './Profile.css'
import { UserProvider } from "./profilecom/UserContext";
import SideBarp from './Sidebar'
import ChatApp from './Chat'

function Profile(){
    return(
    <>
    <div><BasicExample/></div>
    <div className='pro'>
    <UserProvider> 
      <SideBarp/>
     
      <ChatApp/>
    </UserProvider>
        
    </div>
    </>
)
}
export default Profile;