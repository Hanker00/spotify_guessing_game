import { getProviders, signIn } from "next-auth/react"
import InstructionCard from '../components/instructionCard'
function Login({providers}) {
  return (
    <div className='bg-[#121212] w-screen h-screen'>
        <h1 class="bg-gradient-to-r from-[#16FF4A] from-100% to-90% to-[#7EB98B] text-transparent bg-clip-text text-7xl text-center pt-24">Guessify</h1>
        <p className='text-5xl text-center'>
        Welcome to the ultimate music guessing game! <br></br>
            To play simply follow the instructions below
        </p>
        <div className='w-screen flex justify-center space-x-20 mt-6'>
        <InstructionCard number={1} title={"Creating a blend"} description={"Kick things off by blending your Spotify playlists with friends to create a unique, shared playlist that reflects your combined music tastes. Want to use your own playlist instead? Go ahead :)"} />
        <InstructionCard number={2} title={"Start the playlist on your device"} description={"Dive into the mixed vibes and rhythms curated from everyone’s favorites. For the best experience it is recommended to use the player provided by the application"} />
        <InstructionCard number={3} title={"Guess who added the song"} description={"Challenge yourself and guess who added which song to the playlist. Discover how well you know your friends' music tastes and maybe find your new favorite tune along the way. You think you know who listened to this song previously?Press the reveal button and find out!"} />
        </div>
        <div className="text-center mt-20">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
          <button className="bg-[#1E1E1E] text-[#16FF4A] text-3xl p-5 rounded-lg shadow-lg" onClick={() => signIn(provider.id, { callbackUrl: "/"})}>Login with {provider.name} to start playing</button>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}
