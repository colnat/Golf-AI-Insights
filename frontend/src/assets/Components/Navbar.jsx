import '/src/CSS/Navbar.css'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Modal from './Modal.jsx';
export default function Navbar() {
    const currentPage = useLocation().pathname;
    const navigate = useNavigate();
    //The navbar should not render in these four paths
    const noNavbar = ["/login", "/register", "/dashboard", "/"];
    const { pathname } = useLocation();
    const [confirmLogout, setConfirmLogout] = useState({
        show: false,
    });
    if (noNavbar.includes(pathname)) return null;

    const logout = () => {
        navigate('/login');
        localStorage.removeItem("token");
        setConfirmLogout({
            show: false
        });
    };

    const logoutConfirmation = () => {
        setConfirmLogout({
            show: true
            
        });
    };

    const logoutFalse = () => {
        setConfirmLogout({
            show: false
        });
    };

    return (
        <>
            {confirmLogout.show && (
                <div className='center-modal'>
                    <Modal
                        handleTrue={logout}
                        handleFalse={logoutFalse}
                        message={"Are you sure you want to logout?"}
                        buttonTrue='Logout'
                        buttonFalse='Cancel'
                    />
                </div>

            )}
            <nav className="nav">
                <Link to='/dashboard' className='nav-dashboard'><GoHomeFill size={30} /></Link>
                <ul className='nav-dashboard'>
                    <li className={currentPage == '/add-course18/new' || currentPage == '/add-course/new' ? 'active' : ''}>
                        <Link to="/add-course18/new">Add Course</Link>
                    </li>
                    <li className={currentPage == '/add-round18/new' || currentPage == '/add-round/new' ? 'active' : ''}>
                        <Link to="/add-round18/new">Add Round</Link>
                    </li>
                    <li className={currentPage == '/manage-courses' ? 'active' : ''}>
                        <Link to="/manage-courses">Manage Courses</Link>
                    </li>
                    <li className={currentPage == '/manage-rounds' ? 'active' : ''}>
                        <Link to="/manage-rounds">Manage Rounds</Link>
                    </li>
                    <li>
                        <button className='nav-logout-button' onClick={() => logoutConfirmation()}>Logout</button>
                    </li>
                </ul>
            </nav>

        </>

    );
}