const VALID_BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];
const VALID_WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
// const VALID_KEYS = [...VALID_WHITE_KEYS, ...VALID_BLACK_KEYS];
const VALID_KEYS = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm'];
const NOTES = [
    'c', 'db', 'd', 'eb',
    'e', 'f', 'gb', 'g',
    'ab', 'a', 'bb', 'b'
]
const NOTE_TO_KEY = {
    c: 'z',
    db: 's',
    d: 'x',
    eb: 'd',
    e: 'c',
    f: 'v',
    gb: 'g',
    g: 'b',
    ab: 'h',
    a: 'n',
    bb: 'j',
    b: 'm',
};
const KEY_TO_NOTE = {
    z: 'c',
    s: 'db',
    x: 'd',
    d: 'eb',
    c: 'e',
    v: 'f',
    g: 'gb',
    b: 'g',
    h: 'ab',
    n: 'a',
    j: 'bb',
    m: 'b',
};
export { NOTES, NOTE_TO_KEY, KEY_TO_NOTE, VALID_KEYS }
