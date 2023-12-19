import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import KartotajsMain from "./pages/Kartotajs-main";
import KartotajsMessages from "./pages/Kartotajs-messages";
import KartotajsReports from "./pages/Kartotajs-reports";
import KartotajsStorage from "./pages/Kartotajs-storage";

function App() {
  return (
    <>
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<KartotajsMain />} />
                    <Route path="/KartotajsStorage" element={<KartotajsStorage /> } />
                    <Route path="/KartotajsReports" element={<KartotajsReports /> } />
                    <Route path="/KartotajsMessages" element={<KartotajsMessages /> } />
                </Routes>
            </div>
        </Router>
    </>
  );
}

export default App;
