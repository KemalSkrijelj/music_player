import React, {useState} from 'react'

import './styles/app.scss'

import data from './utils'

import Player from './components/Player';
import Song from './components/Song'

function App() {

  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  return (
    <div className="App">
      <Song currentSong= {currentSong}/>
      <Player />
    </div>
  );
}

export default App;
