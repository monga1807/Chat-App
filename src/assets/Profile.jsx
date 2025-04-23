// import * as react from 'react'
import BasicExample from './Navbar'
import './Profile.css'
import { UserProvider } from "./profilecom/UserContext";
import SideBarp from './Sidebar'
import ChatApp from './Chat'
import EmptyChat from './EmptyChat';
import { useUser } from "./profilecom/UserContext";
import { useState } from 'react';

function ChatContainer() {
  const { selectedUser } = useUser();
  return selectedUser ? <ChatApp /> : <EmptyChat />;
}
function Profile(){
  // const { selectedUser } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
    <>
   
<UserProvider>
    <div><BasicExample  toggleSidebar={() => setSidebarOpen(prev => !prev)}/></div>
    <div className='pro'>
     
      <SideBarp className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`} onChatSelect={() => setSidebarOpen(false)} />
 {sidebarOpen && ( <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>)}
     <ChatContainer />
      {/* {selectedUser ? (
        <ChatApp/>
      )
       : (
        <EmptyChat/>
      )} */}
      
    
        
    </div></UserProvider>
    </>
);
}
export default Profile;