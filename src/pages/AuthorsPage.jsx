import '/src/styles/AuthorsPage.css';
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Замени на свой

function AuthorsPage() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/authors`)
            .then(res => setAuthors(res.data))
            .catch(() => setAuthors([]));
    }, []);

    // Отметим популярных авторов — где популярность > 2 экспонатов или по флагу
    const popular = authors.filter(a => a.popular || a.artifact_count > 2);
    const others = authors.filter(a => !(a.popular || a.artifact_count > 2));

    return (
        <div className="authors-container">
            <h1 className="authors-title">Авторы</h1>

            {popular.length > 0 && (
                <section className="popular-authors">
                    <div className="popular-authors-title">Популярные авторы:</div>
                    <div className="authors-list">
                        {popular.map(a => (
                            <div className="author-card" key={a.id}>
                                <div className="author-name">{a.full_name}</div>
                                <div className="author-info">{a.place_of_residence}</div>
                                {a.additional_info && (
                                    <div className="author-info">{a.additional_info}</div>
                                )}
                                <div className="author-count">
                                    {a.artifact_count} экспонат(ов)
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section>
                {others.length > 0 && (
                    <>
                        <div className="popular-authors-title" style={{ color: 'var(--burgundy)' }}>Остальные авторы:</div>
                        <div className="authors-list">
                            {others.map(a => (
                                <div className="author-card" key={a.id}>
                                    <div className="author-name">{a.full_name}</div>
                                    <div className="author-info">{a.place_of_residence}</div>
                                    {a.additional_info && (
                                        <div className="author-info">{a.additional_info}</div>
                                    )}
                                    <div className="author-count">
                                        {a.artifact_count} экспонат(ов)
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {authors.length === 0 && <div>Нет авторов для отображения.</div>}
            </section>
        </div>
    );
}

export default AuthorsPage;
