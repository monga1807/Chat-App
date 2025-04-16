import './Login.css'
import Button from 'react-bootstrap/Button';
// import { signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useState} from 'react';
// import { setDoc, doc} from "firebase/firestore";


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSave= async(e)=>{
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            console.log(user);
            console.log("User registered")
            window.location.href = "/profile";
        } catch (error) {
            console.log(error.message)
        }
    }
    // const handleGoogleLogin = async () => {
       
    //     try {
    //       const result = await signInWithPopup(auth, provider);
    //       const user = result.user;

    //       if (user){
    //                       await setDoc (doc(db, "users",user.uid),{
    //                           id:user.uid,
    //                           email:user.email,
    //                           firstname:fname,
    //                           lastname:lname,
    //                           password:password,
    //                       });
          
    //                   }

    //       console.log("User Info:", user);
    //       window.location.href = "/profile";
    //     } catch (err) {
    //       console.error("Google login error:", err);
    //     }
    // }

    return(
        <>
        <div className='lbody'>
        <form className="Login" >
            <div className="user">
                <label>Email:
                <input type="text" placeholder='Enter Email' autoComplete="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
            </div>
            <div className="user">
                <label>Password:
                <input type={showPassword ? "text" : "password"} placeholder='Enter Password' autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button
                type="button"
                className="button-lshow"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "👁️" : "🙈"}
            </button>
                </label>
            </div>
            <div className="button">
                {/* <Button as="input" type="submit" value="Submit" /> */}
                <Button variant="primary" onClick={handleSave}>Log In</Button>
            </div>
            {/* <div className="button">
                <Button variant="primary"  onClick={handleGoogleLogin}>Signin with Google </Button>
            </div> */}
            <div className="signup"> 
                <a href="/register">New User / Sign in with Google</a>
            </div>
            
        </form>
        </div>
        </>
    )
}
export default Login