import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { loading, data: songData } = useGetSongDetailsQuery({ songid });
  const {
    loading: isFetchingRelatedSongs,
    error,
    data,
  } = useGetSongRelatedQuery({ songid });
  if (isFetchingRelatedSongs || loading) {
    return <Loader title="Searching song details" />;
  }
  if (error) {
    return <Error />;
  }
  console.log(data, songid);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={songData?.asd} songData={songData} />
      <div className="mb-10 ">
        <h2 className="text-3xl font-bold text-white">Lyrics</h2>
        <div className="mt-5 ">
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((item, index) => (
              <p className="text-gray-400 text-base my-1" key={index}>
                {item}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">No lyrics found</p>
          )}
        </div>
      </div>
      {/* <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlayClick={handlePlayClick}
        handlePauseClick={handlePauseClick}
      /> */}
    </div>
  );
};

export default SongDetails;
