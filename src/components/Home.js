import { Link } from "react-router-dom";

const Home = ({ currentBlockNumber }) => {
  return (
    <div className="home">
      <h2>Welcome to our Ethereum Block Explorer!</h2>
      <p>
        Our platform offers a seamless way to delve into the Ethereum
        blockchain's intricacies. Simply input the block number you wish to
        investigate into the search bar, and uncover a trove of valuable
        insights. Stay updated with the latest developments by glancing at the
        current block number, which is currently
        <Link to={`/block/${currentBlockNumber}`}>
          <strong> {currentBlockNumber} </strong>
        </Link>
        . Whether you're a developer, investor, or enthusiast, our user-friendly
        interface empowers you to navigate through transaction histories, smart
        contract interactions, and more with ease. Experience the Ethereum
        blockchain in a whole new light with our intuitive Block Explorer.
      </p>
    </div>
  );
};

export default Home;
