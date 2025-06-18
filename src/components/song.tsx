import { forwardRef, type ForwardedRef } from "react";

import "./song.css";

import type { FinalSong } from "../services/song";

const Song = forwardRef(
  ({ song }: { song: FinalSong | null }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} id="song-container" className="off">
        {song && (
          <>
            <div id="cover-art-container">
              <img
                id="cover-art"
                src={song.art}
              />
            </div>
            <div id="song-info">
              <h1>{song.name}</h1>
              <h2>({song.year})</h2>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default Song;
