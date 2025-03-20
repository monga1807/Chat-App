import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../Firebase";
// import { auth } from "firebase/auth";

  export const sendMessage = async (text) => {
    const user = auth.currentUser;
  
    if (!user) {
      console.error("User is not authenticated!");
      return;
    }
  
    // Convert text to a string and trim
    const messageText = String(text || "").trim();
  
    if (!messageText) {
      console.error("Message text is empty or invalid!");
      return;
    }
  
    await addDoc(collection(db, "messages"), {
      text: messageText,
      user: user.displayName || "Anonymous",
      uid: user.uid,
      timestamp: serverTimestamp(),
    });
  };
  
  