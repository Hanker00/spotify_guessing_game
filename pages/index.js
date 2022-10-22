import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signOut, useSession } from "next-auth/react"
import Player from '../components/Player';
import PlaylistCard from '../components/PlaylistCard';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import { playlistIdState, playlistNameState } from '../atoms/playlistAtom';
import { useEffect } from 'react';
import CurrentlyPlaying from '../components/CurrentlyPlaying';


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <title>Spotify Guess</title>
      <link rel="icon" href="/favicon.ico" />
      <div>
        <h1 className="text-4xl font-bold text-center">Spotify guess</h1>
      </div>
      <div className='text-gray-500 p-5 text-sm border-r border-gray-900'>
        <PlaylistCard />
        <Player />
        <CurrentlyPlaying/>
      </div>
      <h1>Spotify </h1>
      <div className="mt-4 bg-[#1DB954] py-2 px-4 rounded-xl">
        <button className='flex items-center space-x-2 hover:text-white' onClick={() => signOut()}>Log out</button>
      </div>
    </div>
  )
}
