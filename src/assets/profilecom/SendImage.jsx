import { Button } from 'react-bootstrap';
import "./SendImage.css"
import { query, collection, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../Firebase';
import { useUser } from './UserContext';

function SendImage(props) {
    const { isOpen, handleCloseModel } = props;
    const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const { selectedUser } = useUser();
//   const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  
  // Fetch current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages from Firestore on load
  useEffect(() => {
    if (!user || !selectedUser?.id){
      setMessages([]); // Clear messages if no user is selected
      return;
    }
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
  
  useEffect(() => {
    if (!user || !selectedUser?.id){
      setMessages([]); // Clear messages if no user is selected
      return;
    }
  
    // Query messages where sender is current user and receiver is selected user, or vice versa
    const q = query(
      collection(db, "messages"),
      orderBy("timestamp", "asc")
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (msg) =>
            (msg.senderUid === user.uid && msg.receiverUid === selectedUser.id) ||
            (msg.senderUid === selectedUser.id && msg.receiverUid === user.uid)
        );
      setMessages(loadedMessages);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user, selectedUser]);

  const handleFile = (e) => {

     if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        console.log("File selected:", file); // Debugging
        setSelectedFile(file);
        } 
    };

  // Function to send message
  const handleSendMessage = async () => {
    if (!selectedFile) {
        alert("Please select an image first.");
        return;
    }
    console.log("File to be saved:", selectedFile);
    handleCloseModel();

        
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result;
            
            try {
            
                if (base64Image && selectedUser?.id) {
                    console.log("image");
                    await addDoc(collection(db, "messages"), {
                        file: base64Image, // Sending the image in chat
                        senderUid: user.uid,
                        receiverUid: selectedUser.id,
                        timestamp: new Date(),
                    });
                    console.log("Message sent:", { sender: user.uid, receiver: selectedUser.id });
                    // alert("Image sent in chat successfully!");
                    // setInput("");
                  }
                handleCloseModel();
            } catch (error) {
                console.error("Error sending image message:", error);
                alert("Failed to send image message.");
            }
        };
        reader.readAsDataURL(selectedFile);    

    // const reader = new FileReader();
    //         reader.onloadend = async () => {
    //             const base64Image = reader.result;
                
    //             if (user) {
    //                 try {
    //                     const userRef = doc(db, "users", user.uid);
    //                     const userSnap = await getDoc(userRef);
                        
    //                     if (userSnap.exists()) {
    //                         await updateDoc(userRef, { imageUrl: base64Image });
    //                     } else {
    //                         console.error("User document does not exist.");
    //                     }
    
    //                     localStorage.setItem("savedImage", base64Image);
    //                     updateProfileImage(base64Image);
    //                     alert("Profile picture updated successfully!");
    //                     handleCloseModel();
    //                 } catch (error) {
    //                     console.error("Error updating profile picture:", error);
    //                     alert("Failed to update profile picture.");
    //                 }
    //             }
    //         };
    //         reader.readAsDataURL(selectedFile);

    // if (input.trim() !== "" && user && selectedUser?.id) {
    //   try {
    //     await addDoc(collection(db, "messages"), {
    //       file: input,
    //       senderUid: user.uid,
    //       timestamp: new Date(),
    //       receiverUid: selectedUser?.id,
    //     });
    //     console.log("Message sent:", { sender: user.uid, receiver: selectedUser?.id });
    //     setInput(""); // Clear input after sending
    //     alert("Profile picture updated successfully!");
    //     handleCloseModel();
        
    //   } catch (error) {
    //     console.error("Error sending message:", error);
    //   }
    // }
  };
  

  useEffect(() => {
   const chatBox = document.querySelector(".chat-box");
   if (chatBox) {
     chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
   }
 }, [messages]); // Runs every time messages update

    return (
        <>
            <div style={isOpen ? { display: '' } : { display: 'none' }} className="popbackground">
                <div className="close-card">
                    <div className="add-card">
                        <div className='ModelHeader'>
                            <h4>
                                Add your Image
                            </h4>
                            <button onClick={() => handleCloseModel()} >X</button>
                        </div>
                        <form action="">
                            <input type="file" onChange={(e) => handleFile(e)}/>
                        </form>
                        <Button variant="primary" type="submit" onClick={() => handleSendMessage()}>Submit</Button>
                        
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default SendImage;
