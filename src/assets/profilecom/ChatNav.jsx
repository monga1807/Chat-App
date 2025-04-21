import React from "react";
import { useUser } from "./UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './ChatNav.css'
// import Sidebarp from '../Sidebar';
import AddImage from "./AddImage";
import { useState } from "react";
import { useEffect } from "react";
import { db, collection, query, onSnapshot , where  } from "../../Firebase";
import { auth } from "../../Firebase";

function ChatNav({ onStartCall }) {
    const { selectedUser } = useUser();
const [user, setUser] = useState(null);
// const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [contacts, setContacts] = useState([]);

   
useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);


    // useEffect(() => {
    //     const storedImage = localStorage.getItem("savedImage");
    //     if (storedImage) {
    //       setProfileImage(storedImage);
    //     }
    //   }, []);

   useEffect(() => {
      if (!user) return; // Ensure user is available before fetching contacts
  
      const fetchContacts = async () => {
        try {
          const q = query(collection(db, "users"));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedContacts = snapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
              .filter((contact) => contact.email && contact.email !== user.email);
            setContacts(loadedContacts);
            console.log("Fetched Contacts:", loadedContacts);
          });
  
          return () => unsubscribe();
        } catch (err) {
          console.error("Error fetching contacts:", err);
          setError(err.message);
        }
      };
  
      fetchContacts();
    }, [user]);    

      

  return (
    <Navbar expand="lg" className="bg-body">
      <Container className='contain-chatnav'>
        <div>
        <img src={ selectedUser?.imageUrl || "/default-avatar.png"} className="chatnav-image"/></div>  
        <Navbar.Brand className='bg-name'>{selectedUser ? (
        <div className="flex items-center space-x-3">
          <h3 className="text-lg">{`${selectedUser.firstname} ${selectedUser.lastname}`}</h3>
        </div>
      )
       : (
        <h4 className="text-lg">ChatApp</h4>
      )
      }</Navbar.Brand>
        
        
          <Nav className="ms-auto">
            <Nav.Link onClick={() => onStartCall()} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg></Nav.Link>
            <Nav.Link ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></Nav.Link>
        <Nav.Link><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
</svg></Nav.Link>
          </Nav>
       
        
      </Container>
      
    </Navbar>
  );
}

export default ChatNav;