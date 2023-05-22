import {useState,useRef, useEffect} from 'react'
import Player from './components/player';
import { songsdata } from './components/audios';
import {Howl} from 'howler'
 import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
 import PauseCircleIcon from '@mui/icons-material/PauseCircle';
 import SkipNextIcon from '@mui/icons-material/SkipNext';
 import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import './App.css';

const audioClips = [
  {
    sound : "https://file-examples.com/storage/fea9880a616463cab9f1575/2017/11/file_example_MP3_700KB.mp3",
    label : "Rain Forest"
  },
  {
    sound : "https://file-examples.com/storage/fea9880a616463cab9f1575/2017/11/file_example_MP3_1MG.mp3",
    label : "upper calm"
  }
]



const App = () => {

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [length, setLength] = useState(0)
  const audioRef = useRef(null)
  
const onPause = () => {
  audioRef.current.pause()
  setIsPlaying(false)
}

const onPlay = () => {
  audioRef.current.play()
  setIsPlaying(true)
}
  

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const ct = audioRef.current.currentTime;

    const progress = (ct/duration) * 100;
    setLength(duration)
    setProgress(progress)
  }

  
  
  console.log(isPlaying)
  return(
    <div className='container'>
      <div className='player-container'>
        <audio
        ref={audioRef}
        src="https://file-examples.com/storage/fea9880a616463cab9f1575/2017/11/file_example_MP3_1MG.mp3"
        onTimeUpdate={onPlaying}
        />
        <h3 className='heading'>first song</h3>
        <div className='audio-mover' style={{width:`${progress + "%"}`}}></div>
        <div className='controls'>
          <button className='btn-style'><SkipPreviousIcon className='icon-style'/></button>
          {isPlaying ? <button className='btn-style' onClick={onPause}><PauseCircleIcon className='icon-style'/></button> 
          : <button className='btn-style' onClick={onPlay}><PlayCircleFilledIcon className='icon-style'/></button> }
          <button className='btn-style'><SkipNextIcon className='icon-style'/></button>
        </div>
      </div>
    </div>
  )
}

export default App;
