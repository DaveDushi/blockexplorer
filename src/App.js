import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import BlockDetails from "./components/BlockDetails";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [currentBlockNumber, setCurrentBlockNumber] = useState();
  useEffect(() => {
    async function getBlockNumber() {
      setCurrentBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });
  return (
    <Router>
      <div className="app">
        <Navbar currentBlockNumber={currentBlockNumber} />
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home currentBlockNumber={currentBlockNumber} />
          </Route>
          <Route path="/block/:blockNumber">
            <BlockDetails alchemy={alchemy} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
