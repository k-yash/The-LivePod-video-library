import { useData } from "../../Contexts/datacontext";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const { onSearchData } = useData();

  return (
    <Link to="/" className="link-box">
      <input
        className="search-bar"
        placeholder="Search for Videos"
        onChange={onSearchData}
      />
    </Link>
  );
};