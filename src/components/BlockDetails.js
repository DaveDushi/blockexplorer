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

  return (
    <div className="block-details">
      <h2>Block # {blockNumber}</h2>
      {isLoading && <Spinner />}
      {error && <div>{error}</div>}
      {data && (
        <div>
          {data.transactions.map((transaction, index) => (
            <div key={index}>
              <p>Transaction Hash: {transaction.hash}</p>
              {/* Render other transaction information as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockDetails;
