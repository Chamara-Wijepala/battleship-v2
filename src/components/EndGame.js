export default function EndGame({ gameWon }) {
  return (
    <div className="fixed inset-0 bg-zinc-900/50 flex justify-center items-center">
      <div className="bg-zinc-800 text-white p-8 rounded-xl mx-8">
        <h2 className="text-xl md:text-4xl lg:text-5xl">
          {gameWon
            ? "Congratulations, you won!"
            : "You lost. Better luck next time"}
        </h2>

        <button
          onClick={() => window.location.reload(false)}
          className="hover:bg-purple-600 focus-visible:bg-purple-600 border-purple-700 border-2 w-full mt-12 transition-colors duration-300
          hover:border-purple-600 focus-visible:border-purple-600 hover:text-white focus-visible:text-white rounded py-2 px-4 text-purple-600"
        >
          Play Again?
        </button>
      </div>
    </div>
  );
}
