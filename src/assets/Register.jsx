// import react from 'react';
import './Register.css'
import Button from 'react-bootstrap/Button';

import {auth , db , provider} from "../Firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useState} from 'react';
import { setDoc, doc } from "firebase/firestore";
import { signInWithPopup } from 'firebase/auth';


function Register(){
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    

    const handleSave= async(e)=>{
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // await createUserWithEmailAndPassword(auth,email,password);
            // const user = auth.currentUser;
            console.log(user);
            if (user){
                await setDoc (doc(db, "users",user.uid),{
                    id:user.uid,
                    email:user.email,
                    firstname:fname,
                    lastname:lname,
                    password:password,
                });

            }
            console.log("User registered")
            window.location.href = "/profile";
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleGoogleLogin = async () => {
           
            try {
              const result = await signInWithPopup(auth, provider);
              const user = result.user;

              let first = "";
              let last = "";
              if (user.displayName) {
              const parts = user.displayName.split(" ");
              first = parts[0];
              last = parts.slice(1).join(" ");
             }
    
              if (user){
                              await setDoc (doc(db, "users",user.uid),{
                                  id:user.uid,
                                  email:user.email,
                                  firstname:first,
                                  lastname:last,
                                  password:password,
                              });
              
                          }
    
              console.log("User Info:", user);
              window.location.href = "/profile";
            } catch (err) {
              console.error("Google login error:", err);
            }
        }

    return(
        <>
        <div className='rbody'>
        <form className="Register" 
        // onSubmit={handleSave}
        >
            <div className="ruser">
                <label>First Name:
                <input type="text" placeholder='Enter First Name' onChange={(e) => setFname(e.target.value)} value={fname} />
                </label>
            </div>
            <div className="ruser">
                <label>Last Name:
                <input type="text" placeholder='Enter Last Name' onChange={(e) => setLname(e.target.value)} value={lname} />
                </label>
            </div>
            <div className="ruser">
                <label>Email:
                <input type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
            </div>
            <div className="ruser">
                <label>Password:
                <input type={showPassword ? "text" : "password"} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button
                type="button"
                className="button-show"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "👁️" : "🙈"}
            </button>
            
                </label>
            </div>
            <div className="rbutton">
                <Button variant="primary"  onClick={handleSave} >Submit </Button>
            </div>
            <div className="rbutton">
                <Button variant="primary"  onClick={handleGoogleLogin}>Signin with Google </Button>
            </div>
            <div className="rlogin"> 
                <a href="/login">Already a user </a>
            </div>
            
        </form>
        </div>
        
        </>
        
    )
}
export default Register