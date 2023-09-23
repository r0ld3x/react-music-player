import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSongs, song, handlePause, handlePlay }) => (isPlaying && activeSongs?.title === song.title ? (
  <FaPauseCircle
    className="text-gray-300"
    size={35}
    onClick={() => handlePause(song)}
  />
) : (
  <FaPlayCircle
    className="text-gray-300"
    size={35}
    onClick={() => handlePlay(song)}
  />
));

export default PlayPause;
