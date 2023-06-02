import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaSave, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './navbar.css'


export const Navbar = () => {
    const [cookies, setCookies] = useCookies(['access_token'])
    const navigate = useNavigate()

    const logout = () => {
        setCookies('access_token', "")
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }
    return (
      <div className="navbar">
        <Link to={'/'}>
          <FaHome /> Home
        </Link>
        <Link to={'/create-recipe'}>
          <FaPlus /> Create Recipes
        </Link>
        <Link to={'/saved-recipes'}>
          <FaSave /> Saved Recipes
        </Link>
        {!cookies.access_token ? (
          <Link to={'/auth'}>
            <FaUser /> Sign-Up/Login
          </Link>
        ) : (
          <button onClick={logout} className='logout'>
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    );
  }
