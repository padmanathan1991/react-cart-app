import "./App.css";
import Home from "./components/Home";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <Home />
      <Toaster />

    </div>
  );
}

export default App;
