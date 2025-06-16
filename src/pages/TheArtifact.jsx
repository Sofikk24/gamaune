import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import placeholderImg from '/src/assets/placeholder.jpg';

const API_URL = import.meta.env.VITE_API_URL;

function ArtifactDetailPage() {
    const { artifactId } = useParams();
    const [artifact, setArtifact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/artifacts/${artifactId}`)
            .then(res => setArtifact(res.data))
            .finally(() => setLoading(false));
    }, [artifactId]);

    if (loading) return <div style={{textAlign: 'center', marginTop: '2em'}}>Загрузка...</div>;
    if (!artifact) return <div style={{textAlign: 'center', marginTop: '2em'}}>Экспонат не найден.</div>;

    return (
        <div className="artifact-detail-container" style={{marginTop : "10vh", color: "var(--burgundy)"}}>
            <h1>{artifact.name}</h1>
            <img
                src={API_URL + artifact.photo_url}
                alt={artifact.name}
                onError={e => { e.target.onerror = null; e.target.src = placeholderImg; }}
                style={{maxWidth: "400px", borderRadius: "20px", margin: "1em 0"}}
            />
            <div style={{fontWeight: 700, margin: "1em 0"}}>
                Материал: {artifact.materials} <br />
                Техника: {artifact.technique} <br />
                Период: {artifact.period_id} <br />
            </div>
            <div style={{margin: "1.2em 0", color: "var(--burgundy)", maxWidth: "60vw", marginLeft: "auto", marginRight: "auto"}}>
                <b>История предмета:</b><br />
                {artifact.story}
            </div>
            <Link to="/artifacts" style={{color: "var(--burgundy)", textDecoration: "underline"}}>← Назад к каталогу</Link>
            {/* Можно добавить список файлов, автора и пр. */}
        </div>
    );
}

export default ArtifactDetailPage;
