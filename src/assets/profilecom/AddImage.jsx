import * as react from 'react';
// import { useRef } from 'react';
import './addimage.css';
import { Button } from 'react-bootstrap';
import { useState , useEffect } from 'react';
// import { addDoc} from 'firebase/firestore';
// import {storage ,  db } from "../firebase"; // Ensure Firebase is configured
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc , updateDoc, getDoc  } from 'firebase/firestore';
// import { useUser } from "./UserContext";

import { db  } from '../../Firebase';
import { auth } from "../../Firebase";

function AddImage(props) {
    const { isOpen, handleCloseModel , onImageUpdate } = props;
    const [user, setUser] = useState(null);
    // const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          setUser(authUser);
        });
        return () => unsubscribe();
      }, []);

    useEffect(() => {
        const storedImage = localStorage.getItem("savedImage");
        if (storedImage && user) {
            updateProfileImage(storedImage);
        }
    }, [user]);
   

    const handleFile = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // console.log("File selected:", file); // Debugging
            setSelectedFile(file);
        } 
    };

    // Handle manual save when user clicks "Submit"
    const handleSave = async() => {
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }
        console.log("File to be saved:", selectedFile);


        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result;
            
            if (user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);
                    
                    if (userSnap.exists()) {
                        await updateDoc(userRef, { imageUrl: base64Image });
                    } else {
                        console.error("User document does not exist.");
                    }

                    localStorage.setItem("savedImage", base64Image);
                    // updateProfileImage(base64Image);
                    if (onImageUpdate) {
                        onImageUpdate(base64Image);
                    }
                    alert("Profile picture updated successfully!");
                    handleCloseModel();
                } catch (error) {
                    console.error("Error updating profile picture:", error);
                    alert("Failed to update profile picture.");
                }
            }
        };
        reader.readAsDataURL(selectedFile);

    };
    const updateProfileImage = (image) => {
        document.querySelectorAll(".chat-item img").forEach(img => {
            img.src = image;
        });
    };

    // const handleSave = async () => {
    //     if (!selectedFile) {
    //         alert("Please select an image first.");
    //         return;
    //     }
        
    //     const fileId = uuidv4(); // Generate a unique ID for the image
    //     const storageRef = ref(storage, `images/${fileId}`);
        
        
    //     try {
    //         // Upload file to Firebase Storage
    //          await uploadBytes(storageRef, selectedFile);
    //          const downloadURL = await getDownloadURL(storageRef);

    //         // Save image URL to Firestore
    //         await addDoc(collection(db, "images"), {
    //             imageUrl: downloadURL,
    //             createdAt: new Date()
    //         });

    //         alert("Image uploaded successfully!");
    //     } catch (error) {
    //         console.error("Error uploading image: ", error);
    //         alert("Error uploading image.");
    //     }
   // };

    // Clear the saved image
    // const handleClear = () => {
    //     localStorage.removeItem("savedImage");
    //     setImage(null);
    // };

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
                        <Button variant="primary" type="submit" onClick={() => handleSave()}>Submit</Button>
                        
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddImage;