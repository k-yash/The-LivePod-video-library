import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/authcontext";
import {SearchBar} from "./searchBar";

export const NavBar = ({setOpenBars}) => {
 
  const {isUserLogIn, logOut} = useAuth();

  return (
    <div className="nav-box">
      <div className="navigation-bar">
      <div className="main-heading">The Live Pod</div>
      {/* <img
        className="logo"
        src="https://www.freelogoservices.com/api/main/images/1j+ojVVCOMkX9Wyrexe4hGfN1qP89VEa+EGZwWJpZ1RfqVY4nSgsh...Fu8vs7KgtFvwhKxkECc8A8jydyUoUUiAw0oWDTcNYcHj1zzw=="
        alt=""
        srcSet=""
      /> */}
      {/* <input type="checkbox"  /> */}
      <SearchBar />
      <div>
      {isUserLogIn?<button className="logout-btn" onClick={()=>logOut()}>Logout</button>:
        <div className="login-div">
          
            <Link className="link-btn" to="/login">Log In </Link>|<Link className="link-btn" to="/signup"> Sign Up</Link>
          
        </div>}
      </div>
      
      <div onClick={()=>{setOpenBars(val=>!val)}} id="menu" className="menu-bar">
        <i className="fad fa-bars"></i>
      </div>
      </div>
    </div>
  );
};
