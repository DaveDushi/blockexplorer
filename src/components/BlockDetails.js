import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const BlockDetails = ({ alchemy }) => {
  const { blockNumber } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    alchemy.core
      .getBlockWithTransactions(parseInt(blockNumber, 10))
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setError(null);
        console.log(data);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, [blockNumber]);

  const formattedDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="block-details">
      <h2>Block # {blockNumber}</h2>
      {isLoading && <Spinner />}
      {error && <div>{error}</div>}
      {data && (
        <div>
          <h3>Miner Account: {data.miner}</h3>
          <h4>Date Mined: {formattedDate(data.timestamp)}</h4>
          <div className="transactions">
            <h3>Transactions</h3>
            {data.transactions.map((transaction, index) => (
              <div key={index} className="transaction-details">
                <p>Transaction Hash: {transaction.hash}</p>
                {/* Render other transaction information as needed */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockDetails;
