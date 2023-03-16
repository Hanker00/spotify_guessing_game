import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signOut, useSession } from "next-auth/react"
import Player from '../components/Player';
import PlaylistCard from '../components/PlaylistCard';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, addedByState } from '../atoms/songAtom';
import { playlistIdState, playlistNameState, totalTracksState } from '../atoms/playlistAtom';
import { useEffect } from 'react';
import CurrentlyPlaying from '../components/CurrentlyPlaying';



export default function Home() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistIdState);
  const [playlistName, setPlaylistName] = useRecoilState(playlistNameState);
  const [totalTracks, setTotalTracks] = useRecoilState(totalTracksState)
  const [addedBy, setAddedBy] = useRecoilState(addedByState)
  useEffect(async () => {
    console.log(spotifyApi.getAccessToken())
    if (spotifyApi.getAccessToken()) {
      let tempName = ""
      let tempCurrentTrack = ""
      await spotifyApi.getMyCurrentPlayingTrack()
        .then(function (data) {
          tempName = data.body.context.uri.substring(17)
          tempCurrentTrack = data.body.item.id
          setPlaylist(data.body.context.uri.substring(17));
          setCurrentTrackId(data.body.item.id)
          console.log("hej")
        }, function (err) {
          console.log('Something went wrong!', err);
        });
      await spotifyApi.getPlaylist(tempName)
        .then((data) => {
          setTotalTracks(data.body.tracks.total)
          setPlaylistName(data.body.name)
        }, (err) => {
          console.log('Something went wrong!', err)
        })
      if (totalTracks > 0) {
        const addedById = await getAddedBy(tempName, tempCurrentTrack)
        console.log(addedById)
        spotifyApi.getUser(addedById)
          .then((data) => {
            setAddedBy(data.body.display_name)
          },
            (err) => {
              console.log('Something went wrong!', err)
            })
      }
    }
  }, [currentTrackId, spotifyApi, session, totalTracks]);

  const getAddedBy = async (playlistId, trackId) => {
    console.log(totalTracks)
    for (let i = 0; i < totalTracks; i += 100) {
      let tracks = []
      tracks = await spotifyApi.getPlaylistTracks(playlistId, {
        offset: i,
        limit: 100,
        fields: 'items'
      })
        .then(
          function (data) {
            return data.body
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        );
      console.log(tracks.items)
      for (let j = 0; j < tracks.items.length; j++) {
        console.log(tracks.items[j])
        if (tracks.items[j].track.id === trackId) {
          console.log(tracks.items[j].added_by)
          return tracks.items[j].added_by.id
        }
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-[#121212] flex-col items-center justify-center py-2">
      <title className='text-white'>Spotify Guess</title>
      <link rel="icon" href="/favicon.ico" />
      <div>
        <h1 className="text-4xl font-bold text-white text-center">Spotify guess</h1>
      </div>
      <div className='text-gray-500 p-5 text-sm '>
        <PlaylistCard />
      </div>
      <button onClick={() => signOut()} className=" 2xl:text-3xl text-lg bg-[#1DB954] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Log out</button>
    </div>


  )
}
