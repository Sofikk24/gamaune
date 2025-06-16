import '/src/styles/palette.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function MainPage() {
    const [categories, setCategories] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(`${API_URL}/categories`),
            axios.get(`${API_URL}/periods`)
        ])
            .then(([catRes, perRes]) => {
                setCategories(catRes.data);
                setPeriods(perRes.data);
            })
            .catch(() => {
                setCategories([]);
                setPeriods([]);
            })
            .finally(() => setLoading(false));
    }, []);

    // Демозаглушки для картинок: key => url, или оставь пусто (будет цвет)
    const categoryImages = {
        "Вышивка": `${API_URL}/uploads/vishivka_main.jpg`,
        "Текстиль": `${API_URL}/uploads/textile_main.jpg`,
        "Картины": `${API_URL}/uploads/draw_main.jpg`,
        "Кузнечное дело": `${API_URL}/uploads/kuznechnoe_main.jpg`
        // ...
    };
    const periodImages = {
        "XIX": `${API_URL}/uploads/XIX.png`,
        "XX": `${API_URL}/uploads/XX.png`,
        "XXI": `${API_URL}/uploads/XXI.png`

    };

    return (
        <div className="main-container">
            <section className="header-block">
                <h1 style={{fontFamily: "Modernist One, Impact, sans-serif", fontSize: "3rem"}}>Незабываемое: рукотворная память</h1>
                <p>
                    Платформа для сохранения, поиска и изучения уникальных рукотворных предметов, переданных через поколения. Откройте историю семьи, культуры и ремёсел вашего края.
                </p>
                <Link to="/add">
                    <button className="add-btn">
                        Рассказать о своём предмете
                    </button>
                </Link>
            </section>

            {/* ======= Виды творчества ======= */}
            <h2 style={{ textAlign: 'center', color: 'var(--burgundy)', fontWeight: 700, margin: '2rem 0 1rem', fontFamily: "Impact, Regular"}}>Виды творчества</h2>
            <div className="section-grid">
                {loading && <div>Загрузка...</div>}
                {!loading && categories.length === 0 && <div>Нет данных</div>}
                {!loading && categories.map(cat => (
                    <Link
                        to={`/artifacts?category=${encodeURIComponent(cat.name)}`}
                        key={cat.id || cat.name}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="category-card" style={{overflow:"hidden"}}>
                            <div className="card-img">
                                <img style={{
                                    width: "106%",
                                    height:"100%",
                                    borderRadius:"18px 18px 0 0",
                                    boxShadow: "0px 0px 5px 2px rgba(34, 60, 80, 0.2)"}}
                                     src={categoryImages[cat.name]}/>
                            </div>
                            <div className="card-title">{cat.name}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* ======= Периоды ======= */}
            <h2 style={{ textAlign: 'center', color: 'var(--burgundy)', fontWeight: 700, margin: '2rem 0 1rem', fontFamily: "Impact, Regular" }}>Периоды</h2>
            <div className="section-grid">
                {loading && <div>Загрузка...</div>}
                {!loading && periods.length === 0 && <div>Нет данных</div>}
                {!loading && periods.map(period => (
                    <Link
                        to={`/artifacts?period=${encodeURIComponent(period.name)}`}
                        key={period.id || period.name}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="period-card">
                            <div className="card-img">
                                <img style={{
                                    width: "106%",
                                    height:"100%",
                                    borderRadius:"18px 18px 0 0",
                                    boxShadow: "0px 0px 5px 2px rgba(34, 60, 80, 0.2)"}}
                                     src={periodImages[period.name]}/>
                            </div>
                            <div className="card-title">{period.name} век</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* ======= Новости ======= */}
            <section className="home-section" style={{ background: 'var(--gold-block)', marginTop: "2.5rem", padding: "1vh 0 1vh 0"}}>
                <div className="section-content" style={{ width: "100%" }}>
                    <strong style={{ color: "var(--burgundy)", fontSize: "1.15em", fontFamily: "Impact, Regular" }} >Последние новости:</strong>
                    <ul className="news-list">
                        <li>Проект стартовал! Добавляйте ваши предметы.</li>
                    </ul>
                </div>
            </section>

        </div>
    );
}

export default MainPage;
