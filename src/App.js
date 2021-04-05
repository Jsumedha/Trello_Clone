import React from "react";
import TrelloLists from './components/TrelloLists';
import './App.scss';


export default function App() {
  return (
    <div className="App">
      <h3 style={{ textAlign: 'center' }}>
        TRELLO CLONE
      </h3>
      <div className="lists">
        <TrelloLists />
      </div>
    </div>
  );
}
