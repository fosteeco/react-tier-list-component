import "./App.css";
import CreateTierListContainer from "./components/CreateTierListContainer";
import { useEffect, useState } from "react";
import initialData from "./initialData";
import initialNewTopicData from "./initialNewTopicData";
import TierRowTray from "./components/TierRowTray";

function App() {
  const [appState, setAppState] = useState(initialData);
  const [genres, setGenres] = useState({});
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    addMultipleItems(20);
  }, []);

  const addMultipleItems = (amount) => {
    let newItems = {};
    let newItemRow = [];
    let currentItemCount = itemCount;
    setItemCount(itemCount + amount);
    for (let i = 0; i < amount; i++) {
      const itemName = "item-" + currentItemCount;
      console.log("itemName :", itemName);
      const newItem = {
        [itemName]: {
          id: itemName,
          altText: itemName,
          desc: itemName,
        },
      };
      const oldItemTrayRow = appState.newDraft.rows["row-tray"].itemIds;
      newItemRow = [...newItemRow, itemName];
      newItems = { ...newItems, ...newItem };
      currentItemCount++;
    }
    setAppState((prevState) => ({
      ...prevState,
      newDraft: {
        ...prevState.newDraft,
        items: { ...newItems, ...prevState.newDraft.items },
        rows: {
          ...prevState.newDraft.rows,
          "row-tray": {
            ...prevState.newDraft.rows["row-tray"],
            itemIds: [
              ...prevState.newDraft.rows["row-tray"].itemIds,
              ...newItemRow,
            ],
          },
        },
      },
    }));
  };

  const addItem = () => {
    const itemName = "item-" + itemCount;
    const newItem = {
      [itemName]: {
        id: itemName,
        altText: itemName,
        desc: itemName,
      },
    };
    const oldItemTrayRow = appState.newDraft.rows["row-tray"].itemIds;
    const newItems = { ...appState.newDraft.items, ...newItem };
    setAppState((prevState) => ({
      ...prevState,
      newDraft: {
        ...prevState.newDraft,
        items: newItems,
        rows: {
          ...prevState.newDraft.rows,
          "row-tray": {
            ...prevState.newDraft.rows["row-tray"],
            itemIds: [...oldItemTrayRow, itemName],
          },
        },
      },
    }));
    setItemCount(itemCount + 1);
  };

  return (
    <div className="container">
      <h1>React Tier List</h1>
      <button onClick={addItem}>Add An Item</button>
      <CreateTierListContainer
        appState={appState}
        setAppState={setAppState}
      ></CreateTierListContainer>
    </div>
  );
}

export default App;
