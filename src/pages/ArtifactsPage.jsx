import '/src/styles/ArtifactsPage.css';
import { useEffect, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import placeholderImg from '/src/assets/placeholder.jpg';

const API_URL = import.meta.env.VITE_API_URL;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ArtifactsPage() {
    const query = useQuery();
    const navigate = useNavigate();

    // динамически получаем категории и периоды
    const [categories, setCategories] = useState([]);
    const [periods, setPeriods] = useState([]);

    // выбранные фильтры (по id!)
    const [categoryId, setCategoryId] = useState(query.get("category_id") || "");
    const [periodId, setPeriodId] = useState(query.get("period_id") || "");
    const [search, setSearch] = useState(query.get("search") || "");
    const [sort, setSort] = useState(query.get("sort") || "date_desc");

    const [artifacts, setArtifacts] = useState([]);

    // подгружаем справочники для селектов
    useEffect(() => {
        axios.get(`${API_URL}/categories`).then(res => setCategories(res.data));
        axios.get(`${API_URL}/periods`).then(res => setPeriods(res.data));
    }, []);

    // подгружаем экспонаты с фильтрами
    useEffect(() => {
        console.log(API_URL)
        let url = `${API_URL}/artifacts?`;
        if (search) url += `search=${encodeURIComponent(search)}&`;
        if (categoryId) url += `category_id=${categoryId}&`;
        if (periodId) url += `period_id=${periodId}&`;
        if (sort) url += `sort=${encodeURIComponent(sort)}`;
        axios.get(url)
            .then(res => setArtifacts(res.data))
            .catch(() => setArtifacts([]));
    }, [search, categoryId, periodId, sort]);

    // отправляем фильтры в адресную строку (удобно для сохранения состояния)
    function applyFilters(e) {
        e.preventDefault();
        let params = [];
        if (search) params.push(`search=${encodeURIComponent(search)}`);
        if (categoryId) params.push(`category_id=${categoryId}`);
        if (periodId) params.push(`period_id=${periodId}`);
        if (sort) params.push(`sort=${encodeURIComponent(sort)}`);
        navigate(`/artifacts${params.length ? '?' + params.join('&') : ''}`);
    }

    return (
        <div className="catalog-container">
            <h1 style={{ color: "var(--burgundy)", marginTop: "5vh" }}>Каталог экспонатов</h1>
            <form className="catalog-filters" style={{justifyContent: "center"}} onSubmit={applyFilters}>
                <input
                    type="text"
                    placeholder="Поиск по названию, автору, материалу…"
                    value={search}
                    style={{backgroundColor: "var(--burgundy)"}}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    style={{backgroundColor: "var(--burgundy)"}}
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                >
                    <option value="">Все категории</option>
                    {categories.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                </select>
                <select
                    value={periodId}
                    style={{backgroundColor: "var(--burgundy)"}}
                    onChange={e => setPeriodId(e.target.value)}>
                    <option value="">Все периоды</option>
                    {periods.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                </select>
            </form>
            <div className="artifacts-list">
                {artifacts.length === 0 && <div>Экспонаты не найдены.</div>}
                {artifacts.map(a => (
                    <Link to={`/artifacts/${a.id}`} key={a.id} style={{textDecoration: "none"}}>
                        <div className="artifact-card" key={a.id}>
                            <img
                                src={API_URL + a.photo_url}
                                alt={a.name}
                                onError={e => {
                                    e.target.onerror = null;
                                    e.target.src = placeholderImg;
                                }}
                            />
                            <div className="artifact-title">{a.name}</div>
                            <div className="artifact-meta">
                                {periods.find(p => p.id === a.period_id)?.name || ""} &nbsp;|&nbsp;
                                {a.materials}
                            </div>
                            <div className="artifact-meta">
                                {/* Тут можно вывести имя автора, если оно приходит */}
                            </div>
                            <div className="artifact-story">
                                {a.story}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ArtifactsPage;
