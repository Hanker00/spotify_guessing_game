import { atom } from "recoil";

export const currentTrackIdState = atom({
    key: "currentTrackIdState",
    default: null,
})

export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
})

export const addedByState = atom({
    key: "addedByState",
    default: "Loading..."
})

export const showAddedState = atom({
    key: "showAddedState",
    default: true,
})