import './Login.css'
import Button from 'react-bootstrap/Button';
// import { signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useState , useEffect} from 'react';
// import { setDoc, doc} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/profile");
      }
      else {
        // optional: navigate("/login"); // or stay on current route
      }
    });
    return () => unsubscribe(); 
  }, [navigate]);

    const handleSave= async(e)=>{
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            console.log(user);
            console.log("User registered");
            window.location.href = "/profile";
        } catch (error) {
            console.log(error.message);
            alert("invalid credentials");
        };
    };
  

    return(
        <>
        <AuthWrapper />
        <div className='lbody'>
        <form className="Login" onSubmit={handleSave}>
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
                <Button variant="primary" type="submit">Log In</Button>
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