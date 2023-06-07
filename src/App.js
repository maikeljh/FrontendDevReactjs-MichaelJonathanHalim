import Navbar from "./components/navbar";
import Routes from "./routes";

function App() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar />
      <main className="p-6 md:p-10 flex flex-col gap-10">
        <Routes />
      </main>
    </div>
  );
}

export default App;
