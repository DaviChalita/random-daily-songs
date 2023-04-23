import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/AudioPlayer.module.css";
import { FaPause, FaPlay } from "react-icons/fa";
import { AiOutlineStepForward, AiOutlineStepBackward } from "react-icons/ai";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backFifteen = () => {
    progressBar.current.value = Number(progressBar.current.value - 15);
    changeRange();
  };

  const forwardFifteen = () => {
    progressBar.current.value = Number(progressBar.current.value + 15);
    changeRange();
  };

  return (
    <div className={styles.audioPlayer}>
      <audio
        id="audioPlayerId"
        ref={audioPlayer}
        src="https://p.scdn.co/mp3-preview/58be3e952bcf4b8d4f972ee06c2f8967b0551696?cid=1a306c38d6e54a47a852d65f3b1d810e"
        preload="metadata"
      ></audio>
      <button className={styles.forwardBackward} onClick={backFifteen}>
        15 <AiOutlineStepBackward />
      </button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
      </button>
      <button className={styles.forwardBackward} onClick={forwardFifteen}>
        15 <AiOutlineStepForward />
      </button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>

      {/* duration */}
      <div className={styles.duration}>
        {duration && !isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  );
};

export { AudioPlayer };
