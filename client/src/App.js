import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getColumns, getCards, changeCards } from "./utils/endpoints";
import ColumnCard from "./components/ColumnCard";

function App() {

  const [columns, setColumns] = useState(null);
  const [cards, setCards] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [usedItem, setUsedItem] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const columns = await axios.get(getColumns);
    if (columns.status === 200) {
      setColumns(columns.data);
    }
    const cards = await axios.get(getCards);
    if (cards.status === 200) {
      setCards(cards.data);
    }
  };

  const changeCardsAction = async (columnId, cardId) => {
    console.log(columnId, cardId);
    const res = await axios.post(changeCards, {
      columnId: columnId,
      cardId: cardId,
    });
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  };

  const handleDragStart = (id, e, colIndex, cardIndex) => {
    setDraggedItem({ colIndex, cardIndex });
    setUsedItem({ id });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, colIndex) => {
    e.preventDefault();
    const cardIndex = columns[colIndex].card_id.length;
    const fromColIndex = draggedItem.colIndex;
    const fromCardIndex = draggedItem.cardIndex;
    const updatedColumns = [...columns];
    const movedCard = updatedColumns[fromColIndex].card_id.splice(
      fromCardIndex,
      1
    )[0];
    updatedColumns[colIndex].card_id.splice(cardIndex, 0, movedCard);
    console.log(usedItem.id);
    try {
      const isDone = await changeCardsAction(
        updatedColumns[colIndex]._id,
        usedItem.id
      );
      if (isDone === true) {
        setColumns(updatedColumns);
        setDraggedItem(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (columns !== null && cards !== null) {
    return (
      <div className="App">
        <h1>Columns and Cards</h1>
        <section id="column-list" className="flex">
          {columns.map((col, colIndex) => (
            <ColumnCard
              key={col._id}
              col={col}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
              colIndex={colIndex}
              cards={cards}
            />
          ))}
        </section>
      </div>
    );
  } else {
    return <div className="App">Loading</div>;
  }
}

export default App;
