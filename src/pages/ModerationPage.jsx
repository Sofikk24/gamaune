import '/src/styles/palette.css'; // свой CSS!
import { useEffect, useState } from "react";
import axios from "axios";
import placeholderImg from '/src/assets/placeholder.jpg';

const API_URL = import.meta.env.VITE_API_URL;

function ModerationPage() {
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchArtifacts();
    }, []);

    async function fetchArtifacts() {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(`${API_URL}/admin/artifacts/moderation`);
            setArtifacts(res.data);
        } catch (err) {
            setError("Ошибка загрузки данных.");
        } finally {
            setLoading(false);
        }
    }

    async function handleModerate(id, action) {
        try {
            await axios.post(`${API_URL}/admin/artifacts/${id}/${action}`);
            setArtifacts(arts => arts.filter(a => a.id !== id));
        } catch (err) {
            alert("Ошибка при модерации.");
        }
    }

    return (
        <div className="catalog-container">
            <h1 style={{ color: "var(--burgundy)", margin: "2.2rem 0 1.2rem 0", fontFamily: "Impact, Regular" }}>
                Модерация экспонатов
            </h1>
            {loading && <div>Загрузка...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {!loading && artifacts.length === 0 && <div>Нет экспонатов на модерации.</div>}
            <div className="artifacts-list">
                {artifacts.map(a => (
                    <div className="artifact-card" key={a.id}>
                        <img
                            src={API_URL + a.photo_url || placeholderImg}
                            alt={a.name}
                            onError={e => { e.target.onerror = null; e.target.src = placeholderImg; }}
                        />
                        <div className="artifact-title">{a.name}</div>
                        <div className="artifact-meta">
                            {a.creation_date ? `${a.creation_date} г.` : ""}
                            {a.materials ? ` | ${a.materials}` : ""}
                        </div>
                        <div className="artifact-story" style={{ minHeight: 46, marginBottom: 8 }}>
                            {a.story && a.story.length > 130
                                ? a.story.slice(0, 127) + "…"
                                : a.story}
                        </div>
                        <div className="moderation-actions" style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                            <button
                                className="catalog-btn"
                                style={{ background: "var(--green)", color: "#fff", border: "none", borderRadius: 8, padding: "0.6em 1.5em", fontWeight: 700, cursor: "pointer" }}
                                onClick={() => handleModerate(a.id, "approve")}
                            >
                                Одобрить
                            </button>
                            <button
                                className="catalog-btn"
                                style={{ background: "#c51d14", color: "#fff", border: "none", borderRadius: 8, padding: "0.6em 1.5em", fontWeight: 700, cursor: "pointer" }}
                                onClick={() => handleModerate(a.id, "reject")}
                            >
                                Отклонить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ModerationPage;
