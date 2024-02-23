import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Navbar = ({ currentBlockNumber }) => {
  const [blockNumber, setBlockNumber] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/block/${blockNumber}`);
    setBlockNumber("");
  };

  return (
    <nav className="navbar">
      <div className="title">
        <Link to="/">
          <h1>Ethereum Block Explorer</h1>
        </Link>
        <Link to={`/block/${currentBlockNumber}`}>
          <p>Latest Block Number: {currentBlockNumber}</p>
        </Link>
      </div>

      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={blockNumber}
            onChange={(e) => setBlockNumber(e.target.value)}
          />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
