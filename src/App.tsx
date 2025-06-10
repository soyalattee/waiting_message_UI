import WaitingMessage from "./components/WaitingMessage";
import "./styles.css";

export default function App() {
  return (
    <div className="App py-2">
      <h1 className="text-blue-900 text-xl font-semibold px-4 py-4">
        Waiting messages with Tips
      </h1>
      <div className="max-w-full md:px-16 px-4 flex flex-col gap-4">
        <WaitingMessage />
      </div>
    </div>
  );
}
