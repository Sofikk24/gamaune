import '/src/styles/ArtifactsPage.css';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // замени на свой

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const categoryOptions = [
    "Вышивка", "Резьба по дереву", "Керамика", "Ткачество", "Кузнечное дело"
];
const periodOptions = ["XIX век", "XX век", "XXI век"];

function ArtifactsPage() {
    const query = useQuery();
    const navigate = useNavigate();
    const [artifacts, setArtifacts] = useState([]);
    const [search, setSearch] = useState(query.get("q") || "");
    const [category, setCategory] = useState(query.get("category") || "");
    const [period, setPeriod] = useState(query.get("period") || "");
    const [sort, setSort] = useState("date_desc"); // по умолчанию новые сверху

    // подгружаем экспонаты с фильтрами
    useEffect(() => {
        let url = `${API_URL}/artifacts?`;
        if (search) url += `q=${encodeURIComponent(search)}&`;
        if (category) url += `category=${encodeURIComponent(category)}&`;
        if (period) url += `period=${encodeURIComponent(period)}&`;
        if (sort) url += `sort=${encodeURIComponent(sort)}`;
        axios.get(url)
            .then(res => setArtifacts(res.data))
            .catch(err => setArtifacts([]), );
    }, [search, category, period, sort]);

    // отправляем фильтры в адресную строку
    function applyFilters(e) {
        e.preventDefault();
        let params = [];
        if (search) params.push(`q=${encodeURIComponent(search)}`);
        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (period) params.push(`period=${encodeURIComponent(period)}`);
        navigate(`/artifacts${params.length ? '?' + params.join('&') : ''}`);
    }

    return (
        <div className="catalog-container">
            <h1 style={{color: "var(--burgundy)", marginTop: "5vh"}}>Каталог экспонатов</h1>
            <form className="catalog-filters" onSubmit={applyFilters}>
                <input
                    type="text"
                    placeholder="Поиск по названию, автору, материалу…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Все категории</option>
                    {categoryOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <select value={period} onChange={e => setPeriod(e.target.value)}>
                    <option value="">Все периоды</option>
                    {periodOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="date_desc">Сначала новые</option>
                    <option value="date_asc">Сначала старые</option>
                    <option value="name_asc">По алфавиту (А-Я)</option>
                </select>
                <button className="catalog-btn" type="submit">Показать</button>
            </form>
            <div className="artifacts-list">
                {artifacts.length === 0 && <div>Экспонаты не найдены.</div>}
                {artifacts.map(a => (
                    <div className="artifact-card" key={a.id}>
                        <img src={a.photo_url || "/placeholder.jpg"} className="artifact-photo" alt={a.name} />
                        <div className="artifact-title">{a.name}</div>
                        <div className="artifact-meta">
                            {a.period} &nbsp;|&nbsp; {a.materials} &nbsp;|&nbsp; {a.region}
                        </div>
                        <div className="artifact-meta">
                            {a.author_full_name ? `Автор: ${a.author_full_name}` : ""}
                        </div>
                        <div className="artifact-story">
                            {a.story && a.story.length > 130
                                ? a.story.slice(0, 127) + "…"
                                : a.story}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArtifactsPage;
