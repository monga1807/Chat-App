// import * as react from 'react'
import BasicExample from './Navbar'
import './Profile.css'
import { UserProvider } from "./profilecom/UserContext";
import SideBarp from './Sidebar'
import ChatApp from './Chat'
import EmptyChat from './EmptyChat';
import { useUser } from "./profilecom/UserContext";

function ChatContainer() {
  const { selectedUser } = useUser();

  return selectedUser ? <ChatApp /> : <EmptyChat />;
}
function Profile(){
  // const { selectedUser } = useUser();
    return(
    <>
    <div><BasicExample/></div>
    <div className='pro'>
    <UserProvider> 
      <SideBarp/>
     <ChatContainer/>
      {/* {selectedUser ? (
        <ChatApp/>
      )
       : (
        <EmptyChat/>
      )} */}
      
    </UserProvider>
        
    </div>
    </>
)
}
export default Profile;