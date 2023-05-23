import {useState,useRef, useEffect} from 'react'
 import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
 import PauseCircleIcon from '@mui/icons-material/PauseCircle';
 import SkipNextIcon from '@mui/icons-material/SkipNext';
 import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
 import VolumeOffIcon from '@mui/icons-material/VolumeOff';
 import VolumeDownIcon from '@mui/icons-material/VolumeDown';
 import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './App.css';


const audioClips = [
  {
    sound : "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    label : "Rain Forest"
  },
  {
    sound : "http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
    label : "upper calm"
  }
  ,
  {
    sound : "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    label : "Dragon sera"
  }
]



const App = () => {

  const [songs, setSongs] = useState(audioClips);
  const [currentSong, setCurrentSong] = useState(audioClips[0])

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [len, setLen] = useState(0)
  const audioRef = useRef()
  const clickRef = useRef()
  const [volume, setVolume] = useState(60)
  const [muteVolume, setMuteVolume] = useState(false)
  
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
    setLen(duration)
    setProgress(progress)
  }

  const checkWidth = (e) => {
    const width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divProgress = (offset/width) * 100;
    audioRef.current.currentTime = divProgress/100 * len
  }

  useEffect(() => {
    if(audioRef) {
      audioRef.current.volume = volume/100;
    }
  }, [volume, audioRef]);

  const handlePrevious = () => {
    const index = songs.findIndex(each => each.sound===currentSong.sound)
    if(index === 0) {
      setCurrentSong(audioClips[audioClips.length - 1])
      
    }
    else {
      setCurrentSong(audioClips[index-1])
    }
    audioRef.current.currentTime = 0;
    setIsPlaying(false)
  }

  const handleNext = () => {
    const index = songs.findIndex(each => each.sound===currentSong.sound)
    if(index === audioClips.length - 1) {
      setCurrentSong(audioClips[0])
    }
    else {
      setCurrentSong(audioClips[index+1])
    }

    audioRef.current.currentTime = 0;
    setIsPlaying(false)

  }

  const handleAudioPlay = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play()
  }
  
  console.log(isPlaying)
  return(
    <div className='container'>
      <div className='player-container'>
        <audio
        ref={audioRef}
        src={currentSong.sound}
        onTimeUpdate={onPlaying}
        onEnded={handleAudioPlay}
        />
        <h3 className='heading'>{currentSong.label}</h3>
        <div className='audio-container' onClick={checkWidth} ref={clickRef}>
        <div className='audio-mover' style={{width:`${progress + "%"}`}}></div>
        </div>
        <div className='controls'>
          <button className='btn-style'><SkipPreviousIcon className='icon-style' onClick={handlePrevious}/></button>
          {isPlaying ? <button className='btn-style' onClick={onPause}><PauseCircleIcon className='icon-style'/></button> 
          : <button className='btn-style' onClick={onPlay}><PlayCircleFilledIcon className='icon-style'/></button> }
          <button className='btn-style'><SkipNextIcon className='icon-style' onClick={handleNext}/></button>
        </div>
       <div className='volumes'>
        <button onClick={() => setMuteVolume((prev) => !prev)} className='btn-style'>
            {muteVolume || volume < 5 ? (
                      <VolumeOffIcon className='icon-style'/>
                       ) : volume < 40 ? (
                        <VolumeDownIcon className='icon-style'/>
                       ) : (
                      <VolumeUpIcon className='icon-style'/>
                        )}
            </button>
          <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)} className='input-style'/>
                       </div> 
      </div>
    </div>
  )
}

export default App;
