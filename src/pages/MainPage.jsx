import '/src/styles/palette.css'; // обязательно!
import { Link, useNavigate } from "react-router-dom";


const categories = [
    "Вышивка",
    "Резьба по дереву",
    "Керамика",
    "Ткачество",
    "Кузнечное дело"
];

const periods = [
    "XIX век",
    "XX век",
    "XXI век"
];

function MainPage() {
    // Можно использовать useNavigate для перехода через onClick (альтернатива <Link> — не обязательно)
    const navigate = useNavigate();

    return (
        <div className="main-container">
            <section className="header-block">
                <h1>Незабываемое: рукотворная память</h1>
                <p>
                    Платформа для сохранения, поиска и изучения уникальных рукотворных предметов, переданных через поколения. Откройте историю семьи, культуры и ремёсел вашего края.
                </p>
                <Link to="/add">
                    <button className="add-btn">
                        Рассказать о своём предмете
                    </button>
                </Link>
            </section>

            <section className="info-row">
                <div className="info-block">
                    <strong>Виды творчества:</strong>
                    <ul>
                        {categories.map(cat => (
                            <li key={cat}>
                                <Link
                                    to={`/artifacts?category=${encodeURIComponent(cat)}`}
                                    style={{ color: "var(--burgundy)", textDecoration: "underline", cursor: "pointer" }}
                                >
                                    {cat}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="info-block">
                    <strong>Периоды:</strong>
                    <ul>
                        {periods.map(period => (
                            <li key={period}>
                                <Link
                                    to={`/artifacts?period=${encodeURIComponent(period)}`}
                                    style={{ color: "var(--burgundy)", textDecoration: "underline", cursor: "pointer" }}
                                >
                                    {period}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="info-block">
                    <strong>Последние новости:</strong>
                    <ul className="news-list">
                        <li>Проект стартовал! Добавляйте ваши предметы.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default MainPage;