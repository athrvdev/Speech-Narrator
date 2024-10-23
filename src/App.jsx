import React from 'react'
import "./App.css"
import { useState } from 'react'
import SpeechNarrator from './SpeechNarrator';
import { useEffect } from 'react';

const App = () => {

  const [range, setRange] = useState(1);
  const [text, setText] = useState("Hey, I am a speech narrator. Please enter the text below...");
  const [play, setPlay] = useState(false);

  const [highlightedSection, setHighlightedSection] = useState({
    from : 0,
    to : 0
  });

  const splitText = (text, from, to) =>[
    text.slice(0,from),
    text.slice(from, to),
    text.slice(to)

  ]

  const handleRangeChange = (e) =>{
    setRange(e.target.value);
  }

  const synth = window.speechSynthesis;
  let utterance = new SpeechSynthesisUtterance(text); 

  
  const setUtterance = () =>{
    utterance.addEventListener("boundary", ({charIndex, charLength})=>{
      setHighlightedSection({from : charIndex, to : charIndex + charLength});
    });
    utterance.addEventListener("end", ()=>{setPlay(false)})
  }
  setUtterance();

  const HighlightedText = ({text, from, to}) =>{
    const [start, highlight, finish] = splitText(text, from, to);

    return (
      <div className='card' style={{width : 500,
        textAlign : 'left'
      }}>
        {start}
        <span className='bg-warning'>{highlight}</span>
        {finish}
      </div>
    )
  }

  const handlePlay = () =>{
      synth.speak(utterance);
      synth.resume();
      setPlay(true);
  }

  const handlePause =()=>{
    synth.pause();
    setPlay(false);
  }
  useEffect(()=>{
    utterance.rate = range;
  }, [range])
  

  return (
    <>
    <h1>Speech Narrator</h1>
    <SpeechNarrator HighEl={HighlightedText} showPlay={play} handlePause={handlePause} handlePlay={handlePlay} text={text} highSec={highlightedSection} />
    <div className='container d-flex flex-column'>
      <label>Rate: {range}</label>
      <input value={range} onChange={handleRangeChange} type="range" step=".1" min={"0.5"} max={2} />
   
      <textarea cols="30" rows="10" type='text' value={text} onChange={(e) => setText(e.target.value)} style={{
        width: '400px',
        height : '300px',
        resize : "none"
      }} />
    </div></>
  )
}

export default App