import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
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
    const [showArtist, setShowArtist] = useState(false)
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
        <div className="flex justify-center">
        <div className="p-8 m-3 card w-1/3 flex text-center flex-col justify-center items-center  rounded-lg">
            
          <img className='mb-4 shadow-xl' src={currentSongInfo?.album?.images[0].url}></img>
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
          <h1 className='text-5xl text-white'>{currentSongInfo?.name}</h1>
          <h2 className='text-3xl text-[#847D7D] text-center tracking-widest mb-3'>{currentSongInfo?.artists[0].name}</h2>
                <div className='justify-center'>
                {show ? <button onClick={() => setShow(false)} className="w-64 bg-[#1E1E1E] text-[#16FF4A] text-3xl p-5 rounded-lg shadow-lg">REVEAL</button>
                    : <div className='text-[#16FF4A]'>
                        <p className='mt-4 2xl:text-3xl text-lg'>Song from:</p>
                    <p className='mt-4 2xl:text-3xl text-lg'>{addedBy}</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default PlaylistCard;