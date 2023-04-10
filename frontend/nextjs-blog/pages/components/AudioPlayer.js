import React, {useState} from 'react'
import styles from "../../styles/AudioPlayer.module.css";
import { FaPause, FaPlay } from  "react-icons/fa"
import { AiOutlineStepForward, AiOutlineStepBackward } from  "react-icons/ai"

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    return(
        <div className={styles.audioPlayer}>
            <audio src="https://p.scdn.co/mp3-preview/58be3e952bcf4b8d4f972ee06c2f8967b0551696?cid=1a306c38d6e54a47a852d65f3b1d810e" preload='metadata'></audio>
            <button className={styles.forwardBackward}>30 <AiOutlineStepBackward/></button>
            <button onClick={togglePlayPause} className={styles.playPause}>
                {isPlaying ? <FaPause/> : <FaPlay className={styles.play}/>}
            </button>
            <button className={styles.forwardBackward}>30 <AiOutlineStepForward /></button>

            {/* current time */}
            <div className={styles.currentTime}>0:00</div>

            {/* progress bar */}
            <div>
                <input type='range' className={styles.progressBar} />
            </div>

            {/* duration */}
            <div className={styles.duration}>2:49</div>
        </div>
    )
}

export {AudioPlayer}