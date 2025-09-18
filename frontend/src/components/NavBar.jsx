import { Link, useNavigate } from 'react-router-dom'
import '../style/navbar.css'
import { getCurrentUser, logout } from '../api/projectApi'
import { useState } from 'react'
import { useEffect } from 'react'
const NavBar = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [])
    const fetchUser = async () => {
        try {
            const result = await getCurrentUser();
            if (result.success) setUser(result.user);
        } catch (err) {
            setUser(null);
        }
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login')
        } catch (err) {
            console.error("Logout failed:", err.respones?.data || err.message);
        }
    };

    return (
        <>
            <div className="navContainer">
                <div className="head">
                    <h1><Link to='/'>Project Manager</Link></h1>
                </div>
                <div className="listContainer">
                    <ul>
                        <li><Link to='/'>Projects</Link></li>
                        <li><Link to='/addproject'>Add New</Link></li>
                        {
                            user?(
                                <>
                                <li><button onClick={handleLogout}>Logout</button></li>
                                </>
                            ):(
                                <>
                                <li><Link to="/signup">SignUp</Link></li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
export default NavBar