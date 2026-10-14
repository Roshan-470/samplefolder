import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import People from "./pages/People";
import PersonDetails from "./pages/PersonDetails";
import Connections from "./pages/Connections";
import MapPage from "./pages/Map";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/:id" element={<PersonDetails />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
