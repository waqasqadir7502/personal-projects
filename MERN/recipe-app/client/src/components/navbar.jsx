import logo from "../images/logo.png"
import "../App.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  //LogOut Function
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <nav >
    <div className="navbar">
      <div className="logo">
      <NavLink
          to="/"
        >
         <img src={logo} alt="RecipeGram" className="logo" />
        </NavLink>
      
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          Home
        </NavLink>
        {!cookies.access_token ? (
          <NavLink to="/auth" className="register-btn">Sign In</NavLink>
        ) : (
          <>
            <NavLink to="/create-recipe">Create Recipe</NavLink>
            <NavLink to="/saved-recipe">Saved Recipe</NavLink>
            <button onClick={logout} className="logout-btn">Log Out</button>
          </>
        )}
      </div>
    </div>
    </nav>
  );
}

export default Navbar;
