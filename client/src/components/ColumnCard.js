// ColumnCard.js
import React from "react";

const ColumnCard = ({
  col,
  handleDragOver,
  handleDrop,
  handleDragStart,
  colIndex,
  cards,
}) => {
  return (
    <div key={col._id}>
      <h3>{col.name}</h3>
      <div
        className="column"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, colIndex)}
      >
        {col.card_id.map((id, cardIndex) => (
          <div
            key={id}
            className="card"
            onDragStart={(e) => handleDragStart(id, e, colIndex, cardIndex)}
            draggable
          >
            <p>{cards.find((item) => item._id === id).name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnCard;
