import './song.css';

import { songArtURLTemplate } from "../constants";
import type { FinalSong } from "../services/song";

const Song = (song: FinalSong) => {
	return (
		<div className='mx-auto flex flex-col max-w-sm h-full items-center justify-center'>
			<div id='cover-art-container'>
				<img id='cover-art' src={songArtURLTemplate.replace('FILE', song.art)}/>
			</div>
			<div id='song-info'>
				<h1>{song.name}</h1>
				<h2>{song.year}</h2>
			</div>
		</div>
	);
};

export default Song;