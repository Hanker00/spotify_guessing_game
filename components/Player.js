import { useSession } from 'next-auth/react';
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistNameState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Player() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const playlist = useRecoilValue(playlistNameState)

    return (
        <div></div>
    )
}

export default Player