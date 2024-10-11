import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'
import useAuthState from './hooks/useAuthState'

const NavBar = () => {
    const user = useAuthState()
    const navigate = useNavigate

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
            </ul>
            <div className="nav-right">
                { user ?
                    <button onClick={async () => {
                        try {
                            await signOut(getAuth())
                            
                        } catch (error) {
                            console.error("An error occurred while signing out:", error);
                        }                      
                    }}>Log out</button>
                    : <button onClick={() => {
                        navigate('/login')
                    }}>Log in</button>
                }
            </div>
        </nav>
    );
}

export default NavBar;