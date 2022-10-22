import { useRecoilState } from "recoil";
import { addedByState, currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify"
import { useSession } from "next-auth/react";
import { playlistIdState, playlistNameState, totalTracksState } from "../atoms/playlistAtom";
import { useEffect } from "react";
function CurrentlyPlaying() {
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
            console.log("hej")
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
                if(totalTracks > 0) {
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
        console.log("this acutally runs")
        console.log(totalTracks)
        for(let i = 0; i < totalTracks; i += 100) {
            let tracks = []
            tracks = await spotifyApi.getPlaylistTracks(playlistId, {
                offset: i,
                limit: 100,
                fields: 'items'
              })
              .then(
                function(data) {
                  return data.body
                },
                function(err) {
                  console.log('Something went wrong!', err);
                }
              );
              console.log("but this does not?")
              console.log(tracks.items)
              for(let j = 0; j < tracks.items.length; j++) {
                console.log(tracks.items[j])
                if(tracks.items[j].track.id === trackId) {
                    console.log(tracks.items[j].added_by)
                    return tracks.items[j].added_by.id
                }
              }
        }
    }

    return (
        <div>
            <h1>
                
            </h1>
        </div>

    )
}


export default CurrentlyPlaying