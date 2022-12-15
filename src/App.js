import Gameboard from "./components/Gameboard";
import createPlayer from "./factories/createPlayer";

const humanPlayer = createPlayer("Human");
const computerPlayer = createPlayer("Computer");

function App() {
  return (
    <div className="bg-zinc-900 min-w-full min-h-screen">
      <main className="flex items-center justify-center min-h-screen pt-16">
        <div className="container mx-auto grid p-4 lg:p-8 gap-4 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <button
              className="absolute left-1/2 -translate-x-1/2 -top-16 hover:bg-purple-600 focus-visible:bg-purple-600 border-purple-700 border-2
              transition-colors duration-300 hover:border-purple-600 focus-visible:border-purple-600 hover:text-white focus-visible:text-white
              rounded py-2 px-4 text-purple-600"
            >
              Rotate ship
            </button>

            <Gameboard gameBoard={humanPlayer.gameBoard} isHuman />

            <p className="text-gray-300 text-center my-4 text-lg lg:text-2xl">
              {humanPlayer.name}
            </p>
          </div>

          <div>
            <Gameboard gameBoard={computerPlayer.gameBoard} />

            <p className="text-gray-300 text-center my-4 text-lg lg:text-2xl">
              {computerPlayer.name}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
