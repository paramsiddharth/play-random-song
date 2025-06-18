import * as rax from 'retry-axios';
import axios from 'axios';

rax.attach();

import { songDataURLTemplate, songsURL } from '../constants';

type SongsResponse = {
  songs: Song[];
};

type Song = {
  id: string;
  file:  string;
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
	const url = songDataURLTemplate.replace('SONGID', id);
	const resp = await axios.get(url);
	const song =  resp.data as SongData;
	return song;
}

export const getRandomSong = async (): Promise<FinalSong | null> => {
  const resp = await axios.get(songsURL);
  if (resp.status === 200) {
    const songs = (resp.data as SongsResponse).songs;
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
	const songData = await getSongData(randomSong.id);
	return {
	  ...randomSong,
	  ...songData,
	};
  }

  return null;
};
