import { NavLink } from "react-router-dom";

export const SideBar = ({ openBars, setOpenBars }) => {
  return (
    <div className={`sidebar ${openBars ? "sidebar-left" : ""}`}>
      <div className="side-nav-btn">
        <NavLink
          onClick={() => {
            setOpenBars((val) => !val);
          }}
          end
          activeClassName="selected"
          className="btn"
          to="/"
        >
          <i className="far fa-home-lg"></i>
          <span>Home</span>
        </NavLink>

        {/* <NavLink activeClassName="selected" className="btn" to="/latest">
          <i className="far fa-compass"></i>
          <span>Latest</span>
        </NavLink> */}

        <NavLink
          onClick={() => {
            setOpenBars((val) => !val);
          }}
          activeClassName="selected"
          className="btn"
          to="/saved"
        >
          <i className="far fa-bookmark"></i>
          <span>Saved</span>
        </NavLink>

        <NavLink
          onClick={() => {
            setOpenBars((val) => !val);
          }}
          activeClassName="selected"
          className="btn"
          to="/my-playlist"
        >
          <i className="fal fa-bars"></i>
          <span>Playlist</span>
        </NavLink>

        <NavLink
          onClick={() => {
            setOpenBars((val) => !val);
          }}
          activeClassName="selected"
          className="btn"
          to="/liked-videos"
        >
          <i className="far fa-thumbs-up"></i>
          <span>Liked </span>
        </NavLink>

        <NavLink
          onClick={() => {
            setOpenBars((val) => !val);
          }}
          activeClassName="selected"
          className="btn"
          to="/history"
        >
          <i className="far fa-history"></i>
          <span>History</span>
        </NavLink>
      </div>
    </div>
  );
};
