import './App.css'
import './styles/palette.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import ArtifactsPage from "./pages/ArtifactsPage.jsx";
import AuthorsPage from "./pages/AuthorsPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import AddArtifactPage from "./pages/AddArtifactPage.jsx";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/artifacts" element={<ArtifactsPage />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/add" element={<AddArtifactPage/>} />
            </Routes>
        </Router>
    );
}

export default App
