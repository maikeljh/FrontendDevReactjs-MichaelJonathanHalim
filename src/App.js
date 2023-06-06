import Navbar from "./components/navbar";
import Routes from "./routes";

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-10 flex flex-col gap-10">
        <Routes />
      </main>
    </div>
  );
}

export default App;
