import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signOut, useSession } from "next-auth/react"
import Player from '../components/Player';
import PlaylistCard from '../components/PlaylistCard';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, addedByState, isPlayingState, blendState } from '../atoms/songAtom';
import { playlistIdState, playlistNameState, totalTracksState } from '../atoms/playlistAtom';
import { useEffect, useState } from 'react';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import PlaylistCardv2 from '../components/PlaylistCardv2';



export default function Home() {
  // Initialize states and hooks
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistIdState);
  const [playlistName, setPlaylistName] = useRecoilState(playlistNameState);
  const [totalTracks, setTotalTracks] = useRecoilState(totalTracksState);
  const [addedBy, setAddedBy] = useRecoilState(addedByState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentStatus, setCurrentStatus] = useState("Please put on a blend playlist or a playlist where multiple people have added songs");
  const [isLoading, setIsLoading] = useState(true);

  // Define a helper function to handle errors
  const handleError = (err) => {
    console.log('Something went wrong!', err);
  };

  // Use an effect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!spotifyApi.getAccessToken()) return;

      let tempName = "";
      let tempCurrentTrack = "";

      try {
        const data = await spotifyApi.getMyCurrentPlayingTrack();
        console.log(data)
        if (data.statusCode !== 204 && data.body.context !== null) {
          tempName = data.body.context.uri.substring(17);
          tempCurrentTrack = data.body.item.id;
          setPlaylist(tempName);
          setCurrentTrackId(tempCurrentTrack);
        } else {
          setCurrentStatus("No song from a playlist is currently playing")
          setIsLoading(false);
        }
      } catch (err) {
        handleError(err);
      }

      if (tempName && tempCurrentTrack) {
        try {
          const data = await spotifyApi.getPlaylist(tempName);
          setTotalTracks(data.body.tracks.total);
          setPlaylistName(data.body.name);
        } catch (err) {
          handleError(err);
        }
      }

      if (totalTracks > 0) {
        const addedById = await getAddedBy(tempName, tempCurrentTrack);
        if (addedById) {
          try {
            const data = await spotifyApi.getUser(addedById);
            setAddedBy(data.body.display_name);
            setIsPlaying(true);
            setIsLoading(false);
          } catch (err) {
            handleError(err);
          }
        }
        else {
          setCurrentStatus("A song from a playlist is playing, but it was not a blend or a playlist with multiple contributors")
          setIsLoading(false);
        }
      }
    };

    fetchData();
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
    <div className="min-h-screen bg-[#121212] py-2 pt-20">
    <div className='p-5 flex justify-between items-center w-full'>
      <button onClick={() => signOut()} className="w-64 bg-[#1E1E1E] text-[#16FF4A] text-3xl p-5 rounded-lg shadow-lg">Log out</button>
      <h1 class="flex-grow text-center bg-gradient-to-r from-[#16FF4A] from-100% to-90% to-[#7EB98B] text-transparent bg-clip-text text-7xl text-center">Guessify</h1>
      <div class="w-64 opacity-0 p-5">
      </div>
    </div>
    {isLoading ? (
      <p className='text-3xl text-center'>Loading...</p>
    ) : isPlaying ? (
      <div className='text-gray-500 p-5 text-sm '>
        <PlaylistCard/>
      </div>
    ) : (
      <p className='text-3xl text-center'>{currentStatus}</p>
    )}
  </div>


  )
}
