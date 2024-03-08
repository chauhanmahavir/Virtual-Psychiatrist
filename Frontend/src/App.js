import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import About from './About/About';
import Contact from './Contact/Contact';
import SignUp from './SignUp/SignUp';
import LogIn from './LogIn/LogIn';
import Background from './Background/Background';
import Menu from './Menu/Menu';

function App() {
  return (
    <BrowserRouter>
    <Background></Background>
    <Menu></Menu>
      <Routes>
        
        <Route path="/" element={<LandingPage />}>
        </Route>
        
        <Route path="/about" element={<About />}>
        </Route>

        <Route path="/contact" element={<Contact />}>
        </Route>

        <Route path="/login" element={<LogIn />}>
        </Route>

        <Route path="/signup" element={<SignUp />}>
        </Route>

      </Routes>
    </BrowserRouter>
    
  );
}


export default App;
