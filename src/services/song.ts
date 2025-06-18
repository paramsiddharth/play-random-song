import * as rax from "retry-axios";
import axios from "axios";

rax.attach();

import { songArtURLTemplate, songDataURLTemplate, songsURL } from "../constants";

type SongsResponse = {
  songs: Song[];
};

type Song = {
  id: string;
  file: string;
  year: number;
};

interface SongData {
  name: string;
  art: string;
}

export type FinalSong = {
  name: string;
  art: string;
  id: string;
  file: string;
  year: number;
};

const getSongData = async (id: string): Promise<SongData> => {
  const url = songDataURLTemplate.replace("SONGID", id);
  const resp = await axios.get(url);
  const song = resp.data as SongData;
  return song;
};

const getArtDataURI = async (art: string): Promise<string> => {
  const url = songArtURLTemplate.replace("FILE", art);
  const resp = await axios.get(url, {
    responseType: "arraybuffer",
    responseEncoding: "base64"
  });
  const contentType = resp.headers["content-type"];
  const base64Image =  btoa(
    new Uint8Array(resp.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
  return `data:${contentType};base64,${base64Image}`;
};

export const getRandomSong = async (): Promise<FinalSong | null> => {
  const resp = await axios.get(songsURL);
  if (resp.status === 200) {
    const songs = (resp.data as SongsResponse).songs;
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const songData = await getSongData(randomSong.id);

    if (songData.art) {
      songData.art = await getArtDataURI(songData.art);
    }

    return {
      ...randomSong,
      ...songData,
    };
  }

  return null;
};
