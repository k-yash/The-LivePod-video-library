import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/authcontext";
import {SearchBar} from "./searchBar";

export const NavBar = ({setOpenBars}) => {
 
  const {isUserLogIn, logOut} = useAuth();

  return (
    <div className="nav-box">
      <img
        className="logo"
        src="https://www.freelogoservices.com/api/main/images/1j+ojVVCOMkX9Wyrexe4hGfN1qP89VEa+EGZwWJpZ1RfqVY4nSgsh...Fu8vs7KgtFvwhKxkECc8A8jydyUoUUiAw0oWDTcNYcHj1zzw=="
        alt=""
        srcSet=""
      />
      {/* <input type="checkbox"  /> */}
      <div onClick={()=>{setOpenBars(val=>!val)}} id="menu" className="menu-bar">
        <i className="fad fa-bars"></i>
      </div>
      {isUserLogIn?<button onClick={()=>logOut()}>Logout</button>:<Link to="/login">Login</Link>}
      <SearchBar />

      {/* <ul class="navigation">
        <li>
          <a class="nav-btn" href="#home">
            Home
          </a>
        </li>
        <li>
          <a class="nav-btn" href="#home">
            About
          </a>
        </li>
        <li>
          <a class="nav-btn" href="#home">
            Blog
          </a>
        </li>
        <li>
          <a class="nav-btn" href="#home">
            Contact
          </a>
        </li>
      </ul> */}
    </div>
  );
};
