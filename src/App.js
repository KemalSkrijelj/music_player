import React, {useState, useRef, useEffect} from 'react'

import './styles/app.scss'

import data from './data'

import Library from './components/Library';
import Player from './components/Player';
import Song from './components/Song'
import Nav from './components/Nav'
import { library } from '@fortawesome/fontawesome-svg-core';
function App() {
  
  const audioRef = useRef(null)


  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage:0,
 })
  const [libraryStatus, setLibraryStatus] = useState(false)

 const timeUpdateHandler = (e) => {
  const current = e.target.currentTime
  const duration = e.target.duration
  //Calculate Percantage
  const roundedCurrent = Math.round(current)
  const roundedDuration = Math.round(duration)
  const animation = Math.round((roundedCurrent / roundedDuration) * 100)
  setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation})
}

const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  const audio = audioRef.current;
  // Add an event listener to play the audio once it is ready
  const playPromise = new Promise((resolve, reject) => {
    audio.addEventListener('canplay', resolve, { once: true });
  });

  try {
    await playPromise;
    if (isPlaying) {
      await audio.play();
    }
  } catch (error) {
    console.error('Error playing audio:', error);
  }
};

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong= {currentSong} />
      <Player
      audioRef={audioRef}
      setIsPlaying={setIsPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      />
      <Library 
      audioRef={audioRef}
      songs={songs} 
      setCurrentSong={setCurrentSong}
      isPlaying={isPlaying}
      setSongs={setSongs}
      libraryStatus={libraryStatus}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler} 
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
        ></audio>
    </div>
  );
}

export default App;
