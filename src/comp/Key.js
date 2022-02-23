import React from 'react'
import { NOTE_TO_KEY } from '../global/constants';
import './Key.css'
import _ from 'lodash'

export default function Key({ note, pressedKeys, }) {
    // console.log("render")
    const noteIsFlat = (note) => {
        return note.length > 1;
    }

    const keyIsPressed = (note, pressedKeys) => {
        return _.includes(pressedKeys, NOTE_TO_KEY[note])
    }
    let keyClassName = "key ";
    const noteIsFlatBool = noteIsFlat(note)
    const keyIsPressedBool = keyIsPressed(note, pressedKeys)
    if (noteIsFlatBool) {
        keyClassName += "sharp ";
    }
    if (keyIsPressedBool) {
        keyClassName += "pressed";
    }
    let key;
    if (noteIsFlatBool) {
        key = <div className={keyClassName}>{note.toUpperCase()}</div>
    } else {
        key = (
            <div className={keyClassName}  >
                <div className="keytext" >
                    {note.toUpperCase()}
                </div>
            </div >
        );
    }

    return (
        key
    )
}


