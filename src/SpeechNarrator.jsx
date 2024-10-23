import React from 'react'
import {AiFillRobot, AiOutlineRobot} from "react-icons/ai"

const robotStyle ={
    fontSize : 100,
    padding : 0,
    cursor: 'pointer',
}

const SpeechNarrator = ({HighEl, showPlay, text, highSec, handlePause, handlePlay}) => {
  return (
    <div className='container d-flex flex-column my-3' style={{gap : 30}}>
       
        {showPlay ?<AiFillRobot style={robotStyle} onClick={handlePause} className="text-primary" /> :
        <AiOutlineRobot style={robotStyle} onClick={handlePlay} />}

        <HighEl text={text} {...highSec} />
    </div>
  )
}

export default SpeechNarrator
