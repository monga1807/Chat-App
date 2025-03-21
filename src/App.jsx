import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './assets/Register'
import Login from './assets/Login';
import Profile from './assets/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/myapp/" element={<Login />} />
        <Route path="/myapp/register" element={<Register />} />
        <Route path="/myapp/login" element={<Login />} />
        <Route path="/myapp/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
