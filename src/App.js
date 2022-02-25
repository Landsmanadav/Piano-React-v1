import './App.css';
import Piano from './comp/Piano';
import React, { useState, useEffect, useRef } from 'react'
import * as Tone from 'tone'
import CircularSlider from '@fseehawer/react-circular-slider';
import { KEY_TO_NOTE, VALID_KEYS } from './global/constants';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Manuals
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Keys
      </Typography>
      <Typography variant="body2">
        {VALID_KEYS.map(key => <span style={{ margin: "3px" }}>
          {key}:
          {KEY_TO_NOTE[key].lenght == 1 ? KEY_TO_NOTE[key].toUpperCase() :
            KEY_TO_NOTE[key].charAt(0).toUpperCase() + KEY_TO_NOTE[key].slice(1)}</span>)}
      </Typography>
    </CardContent>
  </React.Fragment >
)



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
      <div className="App-header">
        {/* <Box sx={{ minWidth: 730 }}>
          <Card variant="outlined">{card}</Card>
        </Box> */}
        {/* <img
          width="1100px"
          src={`https://img.ksp.co.il/item/99165/b_3.jpg?v=5`}
          loading="lazy"
        /> */}
        <div className="Sliders">
          <CircularSlider
            label="Reverb"
            min={0}
            max={180}
            width={120}
            knobSize={30}
            labelFontSize={"0.8rem"}
            labelBottom={true}
            labelColor="#005a58"
            knobColor="#005a58"
            progressColorFrom="#00bfbd"
            progressColorTo="#005a58"
            progressSize={10}
            trackColor="#eeeeee"
            trackSize={5}
            hideKnob={false}
            data={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
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
            min={0}
            max={180}
            width={120}
            knobSize={30}
            labelFontSize={"0.8rem"}
            labelBottom={true}
            labelColor="#005a58"
            knobColor="#005a58"
            progressColorFrom="#00bfbd"
            progressColorTo="#005a58"
            progressSize={10}
            trackColor="#eeeeee"
            trackSize={5}
            hideKnob={false}
            data={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
            dataIndex={0}
            knobPosition="bottom"
            progressLineCap="flat"
            onChange={value =>
              tremolo.set({
                wet: value
              })}
          >
          </CircularSlider >
        </div>
        <Piano sampler={sampler} />

      </div>
    </div >
  );
}

export default App;
