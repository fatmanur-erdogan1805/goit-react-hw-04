import { useState } from "react";
import css from "./Header.module.css";
import toast from "react-hot-toast";

const notify = () => toast("Search successfull");
const notifyError = () => toast("Please enter a search term");

const Header = ({ fetchSearchedImages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const page = 1;
  const [perPage, setPerPage] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length === 0) {
      notifyError();
      return;
    } else {
      notify();
    }
    fetchSearchedImages(searchTerm, page, perPage);
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for images..."
          className={css.searchInput}
        />
        <button type="submit">Search</button>
        {/* Per-Page settings */}
        <select
          className={css.perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          name="per-page"
          id="per-page"
        >
          <option value="10">10 (Default)</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </form>
    </header>
  );
};

export default Header;
// This component renders a header with a title and a search form.
