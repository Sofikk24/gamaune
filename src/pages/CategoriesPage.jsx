import '/src/styles/CategoriesPage.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/categories`)
            .then(res => setCategories(res.data))
            .catch(() => setCategories([]));
    }, []);

    // Пример заглушки описаний категорий
    const descriptions = {
        "Вышивка": "Декоративное и художественное вышивание нитями, бисером, лентами.",
        "Резьба по дереву": "Создание художественных изделий и орнаментов из дерева.",
        "Керамика": "Глиняные изделия и художественная роспись по керамике.",
        "Ткачество": "Традиционное и современное ткачество, создание тканей.",
        "Кузнечное дело": "Кузнечные изделия и художественная обработка металла.",
        "Текстиль": "Текстильные художественные изделия.",
        "Картины": "Классическое искусство изображения на холсте"
    };

    function handleClick(category) {
        // Лучше фильтровать по id — фронт и бэк работают стабильно
        navigate(`/artifacts?category_id=${category.id}`);
    }

    return (
        <div className="categories-container">
            <h1 className="categories-title" style={{fontFamily: "Impact, Regular"}}>Виды творчества</h1>
            <div className="categories-list">
                {categories.map(cat => (
                    <div
                        className="category-card"
                        key={cat.id}
                        onClick={() => handleClick(cat)}
                        tabIndex={0}
                        title="Посмотреть экспонаты этого направления"
                    >
                        <div className="category-name">{cat.name}</div>
                        <div className="category-desc">
                            {descriptions[cat.name] || "—"}
                        </div>
                        {cat.artifact_count !== undefined && (
                            <div className="category-count">{cat.artifact_count} экспонат(ов)</div>
                        )}
                    </div>
                ))}
                {categories.length === 0 && <div>Нет данных для отображения.</div>}
            </div>
        </div>
    );
}

export default CategoriesPage;
