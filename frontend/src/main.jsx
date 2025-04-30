
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterUser from './assets/Components/RegisterUser.jsx'
import Login from './assets/Components/Login.jsx'
import AddCourse from './assets/Components/AddCourse.jsx';
import AddCourse18 from './assets/Components/AddCourse18.jsx';
import Dashboard from './assets/Components/Dashboard.jsx';
import AddRound from './assets/Components/AddRound.jsx';
import AddRound18 from './assets/Components/AddRound18.jsx';
import ManageCourses from './assets/Components/ManageCourses.jsx';
import ManageRounds from './assets/Components/ManageRounds.jsx';
import Navbar from './assets/Components/Navbar.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/register" element={<RegisterUser/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-course/:id" element={<AddCourse/>}/>
        <Route path="/add-course18/:id" element={<AddCourse18/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-round/:id' element={<AddRound/>}/>
        <Route path='/add-round18/:id' element={<AddRound18/>}/>
        <Route path='/manage-courses' element={<ManageCourses/>}/>
        <Route path='/manage-rounds' element={<ManageRounds/>}/>
      </Routes>
    
  </BrowserRouter>
 );
