import React from 'react'
import InstructionCard from '../components/instructionCard'
function StartPage() {
  return (
    <div className='bg-[#121212] w-screen h-screen'>
        <h1 class="bg-gradient-to-r from-[#16FF4A] to-[#7EB98B] text-transparent bg-clip-text text-7xl text-center pt-24">Guessify</h1>
        <p className='text-5xl text-center'>
        Welcome to the ultimate music guessing game! <br></br>
            To play simply follow the instructions below
        </p>
        <div className='w-screen flex justify-center space-x-20 mt-6'>
        <InstructionCard number={1} title={"Creating a blend"} description={"Kick things off by blending your Spotify playlists with friends to create a unique, shared playlist that reflects your combined music tastes. Want to use your own playlist instead? Go ahead :)"} />
        <InstructionCard number={2} title={"Start the playlist on your device"} description={"Kick things off by blending your Spotify playlists with friends to create a unique, shared playlist that reflects your combined music tastes. Want to use your own playlist instead? Go ahead :)"} />
        <InstructionCard number={3} title={"Guess who added the song"} description={"Kick things off by blending your Spotify playlists with friends to create a unique, shared playlist that reflects your combined music tastes. Want to use your own playlist instead? Go ahead :)"} />
        </div>
    </div>
  )
}

export default StartPage