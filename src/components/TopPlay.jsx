import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import PlayPause from './PlayPause';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';

const TopChartCard = ({
  song,
  i,
  IsPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2 text-white">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
    <div className="flex-1 flex justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      IsPlaying={IsPlaying}
      activeSongs={activeSong}
      song={song}
      handlePlay={handlePlayClick}
      handlePause={handlePauseClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, IsPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const divRef = useRef(null);
  useEffect(() => {
    if (divRef) divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  if (isFetching || error) return <div>Not Loaded.</div>;
  const topPlays = data.tracks?.slice(0, 5);
  // const song = data.tracks;
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-white font-bold text-base cursor-pointer">
              See More
            </p>
          </Link>
        </div>
        <div className="flex flex-col mt-4 gap-1">
          {topPlays.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              IsPlaying={IsPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
      <div className="w-full font-bold flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-white font-bold text-base cursor-pointer ">
              See More
            </p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays.map((songs, i) => (
            <SwiperSlide
              key={i}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${songs?.artists[0].adamid}`}>
                <img
                  src={songs?.images.background}
                  alt="idk"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default TopPlay;
