import { useParams } from "react-router-dom";

const BlockDetails = () => {
  const { blockNumber } = useParams();
  return (
    <div className="block-details">
      <h2>Block # {blockNumber}</h2>
    </div>
  );
};

export default BlockDetails;
