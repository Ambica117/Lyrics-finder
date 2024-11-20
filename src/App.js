import './App.css';
import Axios from 'axios';
import { useState } from 'react';

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);

  function searchLyrics() {
    if (artist === "" || song === "") {
      return;
    }
    
    Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then(res => {
        const lyrics = res.data.lyrics;
        setLyrics(lyrics);
        setWordCount(countWords(lyrics));
        setLetterCount(countLetters(lyrics));
      })
      .catch(err => {
        console.error(err);
        setLyrics("Sorry, lyrics not found.");
        setWordCount(0);
        setLetterCount(0);
      });
  }

  function countWords(lyrics) {
    return lyrics.split(/\s+/).filter(word => word.length > 0).length;
  }

  function countLetters(lyrics) {
    return lyrics.replace(/\s+/g, '').length;
  }

  return (
    <div className="App">
      <h1>Lyrics Finder 🎶</h1>

      <input
        className="inp"
        type="text"
        placeholder='Artist name'
        onChange={(e) => { setArtist(e.target.value) }}
      />
      <input
        className="inp"
        type="text"
        placeholder='Song name'
        onChange={(e) => { setSong(e.target.value) }}
      />
      <button
        className="btn"
        onClick={searchLyrics}>
        🔍 Search
      </button>
      <hr />
      <pre>{lyrics}</pre>
      <hr />
      <div className="count-display">Word Count: {wordCount}</div>
      <div className="count-display">Letter Count: {letterCount}</div>
    </div>
  );
}

export default App;
