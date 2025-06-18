import { useCallback, useEffect, useRef, useState } from 'react';

import './App.css';

import Play from './components/play';
import { type FinalSong, getRandomSong } from './services/song';
import { songFileURLTemplate } from './constants';
import Song from './components/song';
import { sleep } from './util/sleep';

function App() {
  const [pressed, setPressed] = useState(false);
  const [song, setSong] = useState<FinalSong | null>(null);

  const playRef = useRef<HTMLDivElement>(null);
  const songRef = useRef<HTMLDivElement>(null);

  const press = useCallback(() => {
    setPressed(true);
  }, [setPressed]);

  useEffect(() => {
    (async () => {
      if (pressed) {
        const randomSong = await getRandomSong();
        setSong(randomSong);
        playRef.current?.classList.add('off');
        songRef.current!.style.display = 'block';
        await sleep(250);
        playRef.current!.style.display = 'none';
        songRef.current?.classList.remove('off');
      }
    })();
  }, [pressed, setSong]);

  useEffect(() => {
      if (song) {
        const audio = new Audio(songFileURLTemplate.replace('FILE', song.file));
        audio.loop = true;
        audio.play();
      }
  }, [song]);

  return (
    <>
        <div id='titlebar'/>
        <Play ref={playRef} pressed={pressed} press={press} />
        <Song ref={songRef} song={song} />
    </>
  );
}

export default App;
