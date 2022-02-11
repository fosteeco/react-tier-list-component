import "./App.css";
import CreateTierListContainer from "./components/CreateTierListContainer";
import { useState } from "react";
import initialData from "./initialData";

function App() {
  const [appState, setAppState] = useState(initialData);
  const [genres, setGenres] = useState({});
  return (
    <div className="container">
      <h1>React Tier List</h1>
      <CreateTierListContainer appState={appState} setAppState={setAppState} />
    </div>
  );
}

export default App;
