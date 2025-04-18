import React, { useState, useEffect, useRef } from "react";
import "./ChatApp.css";
import "./Sidebar";
import { useUser } from "./profilecom/UserContext";
import { db, collection, addDoc, query, orderBy, onSnapshot, auth, serverTimestamp} from "../Firebase";
import ChatNav from './profilecom/ChatNav'
import SendImage from "./profilecom/SendImage";



const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const { selectedUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  


  const handleCloseModel = () => {
    setIsOpen(false)
  }
  // Fetch current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages from Firestore on load
  useEffect(() => {
    if (!user || !selectedUser?.id) {
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
    if (!user || !selectedUser?.id) {
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

  // Function to send message
  const handleSendMessage = async () => {
    if (input.trim() !== "" && user && selectedUser?.id) {
      try {
        await addDoc(collection(db, "messages"), {
          text: input,
          senderUid: user.uid,
          timestamp: serverTimestamp(),
          receiverUid: selectedUser?.id,
        });
        // console.log("Message sent:", { sender: user.uid, receiver: selectedUser?.id });
        setInput(""); // Clear input after sending
        setShowEmojiBox(false);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
  }, [messages]); // Runs every time messages update
   
  const emojiList = ["😀", "😂", "😅", "😊", "😍", "😎", "😭", "😡", "👍", "🙏", "🔥", "❤️"];
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const emojiBoxRef = useRef(null);
  
  // Close emoji box on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiBoxRef.current && !emojiBoxRef.current.contains(event.target)) {
        setShowEmojiBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  
  
  return (
    <div className="chat-container">
      <div className="Chat-Nav">
        <ChatNav />
      </div>
      <div className="chat-box">

        {messages.map((msg) => {
          const formattedTime = msg.timestamp?.toDate
          ? msg.timestamp.toDate().toLocaleString()
          : "Sending..."; // ✅ display fallback if not yet saved

          return <>
            
              <div key={msg.id} className={`message ${msg.senderUid === user.uid ? "sent" : "received"}`}>
                {msg.file ? (
                  <>
                    {/* {console.log(msg.file, "Image file check")} */}
                    <img src={msg.file} alt="Sent Image"  style={{ maxWidth: "200px", borderRadius: "10px" }} />
                  </>
                ) : (
                  <>
                    {/* {console.log(msg.senderUid, user.uid, "Text message check")} */}
                    <span>{msg.text}</span>
                  </>
                )}
                <div className="timestamp" style={{ fontSize: "10px", color: "#aaa", marginTop: "4px" }}>
                {formattedTime}
              </div>
              </div>
            

          </>
        })}
      </div>
      <div className="input-area">
        <input
          type="text"
          className="chat-input"
          placeholder="Write a message..."
          name='messages'
          value={input}
          // onChange={(e) => console.log(e.target.value)}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <div className="insert-emoji" onClick={() => setShowEmojiBox(!showEmojiBox)}>😀</div>
        {showEmojiBox && (
    <div
      ref={emojiBoxRef}
      style={{
        position: "absolute",
        bottom: "60px",
        left: "0",
        background: "#fff",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        display: "flex",
        flexWrap: "wrap",
        width: "220px",
        zIndex: 1000,
      }}
    >
      {emojiList.map((emoji, idx) => (
        <span
          key={idx}
          onClick={() => {
            setInput(prev => prev + emoji);
            // setShowEmojiBox(false); // auto-close on selection
          }}
          style={{ fontSize: "22px", padding: "6px", cursor: "pointer" }}
        >
          {emoji}
        </span>
      ))}
    </div>
  )}
        <div className="insert-image" onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
          </svg>
        </div>
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
      <SendImage
        isOpen={isOpen}
        handleCloseModel={handleCloseModel}
      />
    </div>
  );
};

export default ChatApp;
