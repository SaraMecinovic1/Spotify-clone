import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  // Refs za audio element i seek bar
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  // Stanja za trenutnoj pesmu, status reprodukcije i vreme
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // Funkcija za reprodukciju pesme
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  // Funkcija za pauziranje pesme
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // Funkcija za pustanje drugih pesama
  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  // Funkcija za pustanje prethodne pesme
  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Funkcija za pustanje sledece pesme
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
    console.log(e, "seek song");
  };
  
  // Efekat koji se pokreće kada se promeni audioRef
  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        // Ažurira vreme reprodukcije pesme
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  // Vrednost konteksta koja se prosleđuje potomcima
  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext }; // kad ne stavim ovo puca app
export default PlayerContextProvider;
