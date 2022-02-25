import React, { useEffect, useState, useRef } from 'react'
import _, { } from 'lodash'
import * as Tone from 'tone'
import { NOTES, VALID_KEYS, KEY_TO_NOTE, NOTE_TO_KEY } from '../global/constants'
import Key from './Key'
import './Piano.css'



export default function Piano({ sampler }) {
    const [pressedKeys, setPressedKeys] = useState([])
    const updatedPressedKeys = [...pressedKeys]
    const [isClicked, setIsClicked] = useState(false)
    const [isOver, setIsOver] = useState(false)
    const [pedal, setPedal] = useState(false)
    console.log(pedal)

    const keyPlaying = (note, bool) => {
        console.log(NOTE_TO_KEY[note])
        if (NOTES.includes(note)) {
            if (!_.isEmpty(note)) {
                if (bool) {
                    playNote(note)
                } else if (!bool) {
                    pauseNote(note)
                }
            }
        }
    }

    const playNote = (note) => {
        sampler.triggerAttack([note.toUpperCase() + 3]);
    }

    const pauseNote = (note) => {
        if (note == " ") {
            sampler.releaseAll()
        } else {
            if (pedal == false) {
                sampler.triggerRelease([note.toUpperCase() + 3],)
                return
            }
        }

    }

    const handleKeyDown = (event) => {
        if (event.repeat) {
            return;
        }
        const key = event.key
        if (key === " ") {
            setPedal(true)
        }
        if (!updatedPressedKeys.includes(key) && VALID_KEYS.includes(key)) {
            updatedPressedKeys.push(key);
            setPressedKeys(updatedPressedKeys)
            keyPlaying(KEY_TO_NOTE[key], true)
        }
    }
    const handleKeyUp = (event) => {
        const key = event.key
        if (key === " ") {
            pauseNote(key)
            setPedal(false)
        }
        if (updatedPressedKeys.includes(key) && VALID_KEYS.includes(key)) {
            keyPlaying(KEY_TO_NOTE[key], false)
            setPressedKeys(updatedPressedKeys.filter(k => k !== key))
        }
    }
    const clickDown = (event) => {
        const key = event.target
        const note = key.textContent.toLowerCase()
        if (NOTES.includes(note)) {
            setIsClicked(true)
            if (!key.className.includes("key")) {
                return
            } else {
                key.className += "pressed"
            }
            updatedPressedKeys.push(NOTE_TO_KEY[note])
            setPressedKeys(updatedPressedKeys)
            keyPlaying(note, true)
        }
    }
    const clickUp = (event) => {
        const key = event.target
        const note = key.textContent.toLowerCase()
        if (NOTES.includes(note)) {
            setIsClicked(false)
            if (!key.className.includes("key ")) {
                return;
            } else {
                if (key.className.includes("sharp")) {
                    key.className = "key sharp "
                } else {
                    key.className = "key "
                }
                setPressedKeys(updatedPressedKeys.filter(k => k !== NOTE_TO_KEY[note]))
                keyPlaying(note, false)
            }
        }
    }
    const clickOver = (event) => {
        if (isClicked) {
            setIsOver(true)
            const key = event.target
            const note = NOTE_TO_KEY[key.textContent.toLowerCase()]
            if (!key.className.includes("key")) {
                return
            } else {
                key.className += "pressed"
            }
            updatedPressedKeys.push(note)
            setPressedKeys(updatedPressedKeys)
            keyPlaying(KEY_TO_NOTE[note], true)
        }
    }
    const clickOut = (event) => {
        if (isClicked) {
            const key = event.target
            const note = NOTE_TO_KEY[key.textContent.toLowerCase()]
            pauseNote(key.textContent.toLowerCase())
            if (!key.className.includes("key ")) {
                return;
            } else {
                if (key.className.includes("sharp")) {
                    key.className = "key sharp "
                } else {
                    key.className = "key "
                }
                setPressedKeys(updatedPressedKeys.filter(k => k !== note))
            }
        }
        setIsOver(false)
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('mousedown', clickDown)
        document.addEventListener('mouseup', clickUp)
        document.addEventListener('touchstart', clickDown)
        document.addEventListener('touchend', clickUp)
        document.addEventListener('mouseover', clickOver)
        document.addEventListener('touchmove', clickOver)
        document.addEventListener('mouseout', clickOut)
        // document.addEventListener('touchmove', clickOut)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('mousedown', clickDown)
            document.removeEventListener('mouseup', clickUp)
            document.removeEventListener('touchstart', clickDown)
            document.removeEventListener('touchend', clickUp)
            document.removeEventListener('touchmove', clickOver)
            document.removeEventListener('mouseover', clickOver)
            document.removeEventListener('mouseout', clickOut)
            // document.removeEventListener('touchmove', clickOut)
            // console.log("mount")

        }
    }, [pressedKeys, updatedPressedKeys, handleKeyUp, handleKeyDown])

    const keys = _.map(NOTES, (note, index) => {
        return (
            <Key
                key={index}
                note={note}
                pressedKeys={pressedKeys}
                setPressedKeys={setPressedKeys}
            />
        );
    });
    const audioFiles = _.map(NOTES, (note, index) => {
        return (
            <audio
                id={note}
                key={index}
                src={`../../notes/${note}.mp3`}
            />
        );
    });

    return (
        <div>
            <div className="piano">
                {keys}
            </div>
            <div>
                {audioFiles}
            </div>

            <div className="notePlaying">
                <h1>{KEY_TO_NOTE[updatedPressedKeys[0]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[1]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[2]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[3]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[4]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[5]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[6]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[7]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[8]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[9]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[10]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[11]]}</h1>
                <h1>{KEY_TO_NOTE[updatedPressedKeys[12]]}</h1>
            </div>
        </div>
    )
}
