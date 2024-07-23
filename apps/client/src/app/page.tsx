export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col justify-center items-center mt-16">
        <h1 className="text-6xl font-bold max-w-4xl text-center">
          Automate as fast as you can type
        </h1>
        <h1 className="font-semibold text-center text-2xl max-w-5xl my-5">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </h1>
        <div className="flex gap-4 text-lg my-4">
          <button className="px-10 py-3 bg-orange-600 text-white rounded-full">
            Start free with email
          </button>
          <button className="px-10 py-3 border border-black rounded-full">
            G Start free with Google
          </button>
        </div>
        <div className="flex items-center gap-3.5 my-6">
          <div className="text-sm">
            ✔<span className="font-bold ml-1 mr-1">Free forever</span>for core
            features
          </div>
          <div className="text-sm">
            ✔<span className="font-bold ml-1 mr-1">More apps</span>than any
            other platform
          </div>
          <div className="text-sm">
            ✔ Cutting edge <span className="font-bold">AI features</span>
          </div>
        </div>
        <div className="my-6">
          <video className="max-w-5xl" src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4" autoPlay muted loop/>
        </div>
      </div>
    </div>
  );
}
