import React, { useState, useEffect  } from "react";
import "./Sidebar.css";
import { db, collection, query, onSnapshot , where , doc , getDoc } from "../Firebase";
import { auth } from "../Firebase";
import { useUser } from "./profilecom/UserContext";
import AddImage from "./profilecom/AddImage";


const Sidebarp = ({ }) => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const { setSelectedUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);


  const handleCloseModel = () =>{
   setIsOpen(false)
  }

  // Fetch current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (authUser) {
        fetchUserProfileImage(authUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserProfileImage = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().imageUrl) {
        setProfileImage(userDoc.data().imageUrl);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };

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
          setFilteredContacts(loadedContacts);
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

  useEffect(() => {
    const storedImage = localStorage.getItem("savedImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredContacts(contacts); // Show all contacts if search is empty
    } else {
      const filtered = contacts.filter((contact) =>
        `${contact.firstname} ${contact.lastname}`.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [search, contacts]);

  const  onSelectChat = (id) => {
    setActiveChat(id);
    try {
      console.log(id)

      // to get the deail iofuser the in context 
      const q = query(collection(db, "users"), where("id", "==", id));
      const unsubscribe = onSnapshot(q,(snapshot) => {
        if (!snapshot.empty) {
          const selectedUserData = snapshot.docs[0].data();
          setSelectedUser(selectedUserData);
        }
      });
      return () => unsubscribe();
    } catch (error) {
       console.error(error);
    }
  }
   
  return (
    <div className="w-80 h-screen bg text-white p-4 border-r border-gray-700">
      <div className="add-image">
      <div
             onClick={() => setIsOpen(true)}
             >
            <img src={ profileImage}  className="w-12 h-12 rounded-full"/></div>
      <div className="flex items-center bg p-2 rounded-lg mb-4">
         
        <span className="text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search or start new chat"
          className="ml-2 w-full bg-transparent outline-none text-white placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      </div>
      <div className="space-y-2 overflow-y-auto h">
      {filteredContacts.map((item, index) => (
          <div 
            key={index} 
            // style={{ "--active-bg": activeChat === item.id ? "blue" : "transparent" }} 
            className={`chat-item ${activeChat === item.id ? "active-chat" : ""}`}
            // className="flex items-center p-3 cursor-pointer hover-bg rounded-lg transition-all"
            onClick={() =>{
              onSelectChat(item.id);}}
          >
            <div className="add-image"
            //  onClick={() => setIsOpen(true)}
             >
           
            <img src={item.imageUrl || "/default-avatar.png"} alt={item.firstname} className="w-12 h-12 rounded-full"/>      
            
            
            </div>
            <div className="ml-3 flex-1 border-b border-gray-700 pb-2">
              <h4 className="font-medium text-white">{item.firstname + " " + item.lastname || "Unknown User"}</h4>
            </div>
          </div>
        ))}
      </div>


      <AddImage 
      isOpen={isOpen} 
      handleCloseModel={handleCloseModel}
      onImageUpdate={(newImage) => setProfileImage(newImage)} 
       />
    </div>
  );
};

export default Sidebarp;