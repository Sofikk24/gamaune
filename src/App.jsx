import './App.css'
import './styles/palette.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import ArtifactsPage from "./pages/ArtifactsPage.jsx";
import AuthorsPage from "./pages/AuthorsPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import AddArtifactPage from "./pages/AddArtifactPage.jsx";
import PeriodsPage from "./pages/PeriodsPage.jsx";
import PartnersPage from "./pages/PartnersPage.jsx";
import AboutProjectPage from "./pages/AboutProjectPage.jsx";
import ContactsPage from "./pages/ContactPage.jsx";
import TheArtifact from "./pages/TheArtifact.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ModerationPage from "./pages/ModerationPage.jsx";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/gamaune/" element={<MainPage />} />
                <Route path="/artifacts" element={<ArtifactsPage />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/add" element={<AddArtifactPage/>} />
                <Route path="/periods" element={<PeriodsPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/about" element={<AboutProjectPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/artifacts/:artifactId" element={<TheArtifact />} />
                <Route path="/gamaune/login" element={<LoginPage />} />
                <Route path="/gamaune/moderation" element={<ModerationPage />} />
            </Routes>
        </Router>
    );
}

export default App
