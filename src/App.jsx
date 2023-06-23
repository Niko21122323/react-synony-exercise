import { useState, useEffect } from "react";
import "./index.css";

const BASE_URL = "https://api.datamuse.com";

export const App = () => {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);

  const getSynonyms = async (word) => {
    const response = await fetch(BASE_URL + "/words?rel_syn=" + word);
    const data = await response.json();
    return data;
  };

  const handleGetSynonyms = (e) => {
    e.preventDefault();
    getSynonyms(word).then((data) => setSynonyms(data));
  };

  const handleClickedSynonym = (newWord) => {
    setWord(newWord);
    getSynonyms(newWord).then((data) => setSynonyms(data));
  };

  return (
    <div className="app">
      <form onSubmit={handleGetSynonyms}>
        <div className="input">
          <label htmlFor="word-input">Enter Word</label>
          <input
            value={word}
            id="word-input"
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>

      <ul>
        {synonyms.map((synonym) => (
          <li
            onClick={() => handleClickedSynonym(synonym.word)}
            key={synonym.word}
          >
            {synonym.word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
