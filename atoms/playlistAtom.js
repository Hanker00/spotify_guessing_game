import { atom } from "recoil"

export const playlistState = atom({
    key: "playlistState",
    default: null,
})

export const playlistNameState = atom({
    key: "playlistNameState",
    default: "Loading..."
})

export const playlistIdState = atom({
    key: "playlistIdState",
    default: ""
})

export const totalTracksState = atom({
    key: "totalTrackState",
    default: 0
})