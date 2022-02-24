import './App.css';
import Piano from './comp/Piano';
import React, { useState, useEffect, useRef } from 'react'
import * as Tone from 'tone'
import CircularSlider from '@fseehawer/react-circular-slider';

function App() {

  const reverb = new Tone.Reverb({
    decay: 7,
    preDelay: 0.0,
    wet: 0
  })

  const tremolo = new Tone.Tremolo({
    depth: 1,
    frequency: 9,
    spread: 180,
    type: "sine",
    wet: 0
  }).start()
  const sampler = new Tone.Sampler({
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },

    onload: () => {
      console.log("load")
    },
    gain: 0,
    release: 0.4,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  });

  sampler.chain(reverb, tremolo, Tone.Destination)
  // if (revOn) {
  //   // sampler.chain(/*tremolo,*/ reverb, Tone.Destination)
  // } else {
  //   sampler.toDestination()

  // }
  return (
    <div className="App">
    
      <header className="App-header">
        <Piano sampler={sampler} />


        <div className="Sliders">
          <CircularSlider
            label="Reverb"
            min={1}
            max={180}
            width={140}
            knobSize={40}
            labelColor="#808080"
            knobColor="#808080"
            progressColorFrom="#808080"
            progressColorTo="#808080"
            progressSize={8}
            trackColor="#eeeeee"
            trackSize={1}
            data={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]} //...
            dataIndex={0}
            knobPosition="bottom"
            progressLineCap="flat"
            onChange={value =>
              reverb.set({
                wet: value
              })}
          />
          <CircularSlider
            label="Tremolo"
            min={1}
            max={180}
            width={140}
            knobSize={40}
            labelColor="#808080"
            knobColor="#808080"
            progressColorFrom="#808080"
            progressColorTo="#808080"
            progressSize={8}
            trackColor="#eeeeee"
            trackSize={1}
            data={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]} //...
            dataIndex={0}
            knobPosition="bottom"
            progressLineCap="flat"
            onChange={value =>
              tremolo.set({
                wet: value
              })}
          />
        </div>
      </header>
    </div >
  );
}

export default App;
