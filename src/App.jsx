import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './assets/Register'
import Login from './assets/Login';
import Profile from './assets/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
