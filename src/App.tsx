import { useEffect, useState } from 'react';

import './App.css';

import Play from './components/play';
import type { FinalSong } from './services/song';
import { getRandomSong } from './services/song';
import { songFileURLTemplate } from './constants';
import Song from './components/song';



function App() {
  const [pressed, setPressed] = useState(false);
  const [song, setSong] = useState<FinalSong | null>(null);

  useEffect(() => {
    (async () => {
      if (pressed) {
        const randomSong = await getRandomSong();
        setSong(randomSong);
      }
    })();
  }, [pressed, setSong]);

  useEffect(() => {
      if (song) {
        const audio = new Audio(songFileURLTemplate.replace('FILE', song.file));
        audio.play();
      }
  }, [song]);

  return (
    <>
      {song == null ? (
        <Play pressed={pressed} setPressed={setPressed} />
      ) : (
        <Song {...song} />
      )}
    </>
  );
}

export default App;
