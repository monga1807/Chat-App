import './Login.css'
import Button from 'react-bootstrap/Button';

import {auth} from "../Firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useState} from 'react';


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

    return(
        <>
        <div className='lbody'>
        <form className="Login" onSubmit={handleSave}>
            <div className="user">
                <label>Email:
                <input type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
            </div>
            <div className="user">
                <label>Password:
                <input type={showPassword ? "text" : "password"} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
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
            <div className="signup"> 
                <a href="/register">New User</a>
            </div>
            
        </form>
        </div>
        </>
    )
}
export default Login