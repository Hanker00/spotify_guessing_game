import { getProviders, signIn } from "next-auth/react"
function Login({providers}) {
  return (
    <div className="flex flex-col items-center bg-[#121212] min-h-screen w-full justify-center">
        <h1></h1>
        <h1 className="text-white">Welcome to Spotify drinking game please login to continue</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
          <button className="bg-[#18D860] text-white p-5 rounded-full" onClick={() => signIn(provider.id, { callbackUrl: "/"})}>Login with {provider.name}</button>
          </div>
        ))}
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
