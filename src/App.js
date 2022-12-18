import { ComputerPlayerBoard, HumanPlayerBoard } from "./components/Gameboards";
import createPlayer from "./factories/createPlayer";

const humanPlayer = createPlayer("Human");
const computerPlayer = createPlayer("Computer");

export default function App() {
  return (
    <div className="bg-zinc-900 min-w-full min-h-screen">
      <main className="flex items-center justify-center min-h-screen pt-16">
        <div className="container mx-auto grid p-4 lg:p-8 gap-4 lg:grid-cols-2 lg:gap-16">
          <HumanPlayerBoard player={humanPlayer} />

          <ComputerPlayerBoard player={computerPlayer} />
        </div>
      </main>
    </div>
  );
}
