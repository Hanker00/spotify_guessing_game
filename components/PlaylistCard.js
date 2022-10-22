import { data } from 'autoprefixer'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistNameState, playlistState, totalTracksState } from "../atoms/playlistAtom"
import { addedByState, currentTrackIdState, showAddedState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'

function PlaylistCard() {
    const { data: session } = useSession()
    const spotifyApi = useSpotify()
    const playlist = useRecoilValue(playlistIdState)
    const [playlistName, setPlaylistName] = useRecoilState(playlistNameState)
    const currentlyTrack = useRecoilValue(currentTrackIdState)
    const [totalTracks, setTotalTracks] = useRecoilState(totalTracksState)
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [show, setShow] = useRecoilState(showAddedState)
    const addedBy = useRecoilValue(addedByState)
    const currentSongInfo = useSongInfo()
    console.log(currentSongInfo)
    useEffect(() => {
        if (playlist !== "") {
            spotifyApi.getPlaylist(playlist)
                .then((data) => {
                    setTotalTracks(data.body.tracks.total)
                    setPlaylistName(data.body.name)
                }, (err) => {
                    console.log('Something went wrong!', err)
                })
        }
    }, [playlist])
    
    const playNext = () => {
        if(spotifyApi.getAccessToken)
        {
            spotifyApi.skipToNext()
            setShow(true)
            setTimeout(fetchNewSong, 2000)
        }
    }

    const playPrevious = () => {
        if(spotifyApi.getAccessToken)
        {
            setShow(true)
            spotifyApi.skipToPrevious()
            setTimeout(fetchNewSong, 2000)
        }
    }

    const fetchNewSong = () => {
        spotifyApi.getMyCurrentPlayingTrack()
            .then((data) => {
                setCurrentTrackId(data.body.item.id)
                console.log(data.body.item.name)
            }, ((err) => {
                console.log("Something went wrong", err)
            }))
    }
    return (
        <div className="p-4 m-3 card w-96 bg-base-100 shadow-xl">
            <figure className="flex flex-col items-center pb-4 ">
                <img className="justify-center" src={currentSongInfo?.album?.images[2].url}/>
            </figure>

            <div className="card-body text-center">
                <h2 className="card-title font-bold text-3xl">{currentSongInfo?.artists[0].name}</h2>
                <h3 className="card-title opacity-40 text-2xl">{currentSongInfo?.name}</h3>
                <div className="flex justify-between items-center ">
                    <div className="text-grey-darker ">
                        <button onClick={playPrevious}>
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z"></path></svg>
                        </button>
                    </div>
                    <div className="text-white p-8 rounded-full bg-red-light shadow-lg">
                        <button>
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"></path></svg>
                        </button>
                    </div>
                    <div className="text-grey-darker">
                        <button onClick={playNext}>
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"></path></svg>
                        </button>
                    </div>
                   
                </div>
                <div className='justify-center'>
                {show ? <button onClick={() => setShow(false)} className="mt-4 bg-[#1DB954] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Click to see who added this song
                    </button>
                    : <p className='mt-4'>{addedBy}</p>}
                </div>
            </div>
        </div>
    )
}

export default PlaylistCard;