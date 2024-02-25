import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { formatEther, formatUnits } from "ethers";

const BlockDetails = ({ alchemy }) => {
  const { blockNumber } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(null);
    setIsLoading(true);
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

  const hexToDecimal = (hex) => {
    return parseInt(hex, 16);
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
          <h4>
            Base Gas Price:{" "}
            {data.baseFeePerGas && formatUnits(data.baseFeePerGas._hex, "gwei")}{" "}
            Gwei
          </h4>
          <h4>
            Gas Used:{" "}
            {data.gasUsed && hexToDecimal(data.gasUsed._hex).toLocaleString()} (
            {data.gasUsed &&
              Math.round((hexToDecimal(data.gasUsed._hex) / 30000000) * 100)}
            %)
          </h4>

          {data.transactions && (
            <div className="transactions">
              <h3>Transactions</h3>
              {data.transactions.map((transaction, index) => (
                <div key={index} className="transaction-details">
                  <h4>{transaction.hash}</h4>
                  <p>
                    <strong>From:</strong> {transaction.from}
                  </p>
                  <p>
                    <strong>To:</strong> {transaction.to}
                  </p>
                  <p>
                    <strong>Value:</strong>{" "}
                    {formatEther(transaction.value._hex)} ETH
                  </p>
                  <p>
                    <strong>Gas Price:</strong>{" "}
                    {formatUnits(transaction.gasPrice._hex, "gwei")} Gwei
                  </p>
                  <p>
                    <strong>Tip:</strong>{" "}
                    {formatUnits(
                      hexToDecimal(transaction.gasPrice._hex) -
                        hexToDecimal(data.baseFeePerGas._hex),
                      "gwei"
                    )}{" "}
                    Gwei
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlockDetails;
