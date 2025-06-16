import '/src/styles/CategoriesPage.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function PeriodsInfoPage() {
    const [periods, setPeriods] = useState([]);
    const [examples, setExamples] = useState({}); // period_id: [artifacts]
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Загружаем все периоды
        axios.get(`${API_URL}/periods`)
            .then(res => {
                setPeriods(res.data);
                // Для каждого периода подгружаем 3 экспоната-примера
                res.data.forEach(period => {
                    axios.get(`${API_URL}/artifacts?period_id=${period.id}&limit=3`)
                        .then(aRes => {
                            setExamples(ex => ({ ...ex, [period.id]: aRes.data }));
                        });
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.7rem 1.2rem 1.5rem 1.2rem" }}>
            <h1 style={{ textAlign: "center", color: "var(--burgundy)", marginBottom: "2rem", fontFamily: "Impact, Regular" }}>
                Исторические периоды в экспонатах
            </h1>
            {loading && <div style={{textAlign:'center'}}>Загрузка...</div>}
            {!loading && periods.map(period => (
                <section
                    key={period.id}
                    style={{
                        background: "var(--beige)",
                        borderRadius: 18,
                        boxShadow: "0 3px 18px rgba(208,166,131,0.13)",
                        marginBottom: "2.2rem",
                        padding: "2rem 2.4rem"
                    }}
                >
                    <h2 style={{ color: "var(--burgundy)", fontWeight: 700, fontSize: "1.5em", marginBottom: ".3em" }}>
                        {period.name} {/* Тут можно добавить годы, если будут в базе */}
                    </h2>
                    {/* Можно добавить описание периода, если добавить поле в БД */}
                    {/* <p style={{ marginBottom: ".9em", fontSize: "1.09em", color:"var(--burgundy)"}}>{period.description}</p> */}
                    <div>
                        <strong style={{ color: "var(--gold)", fontWeight: 700, fontSize: "1.05em" }}>Примеры муниципальных экспонатов:</strong>
                        <ul style={{
                            fontSize: "1.07em", color: "var(--burgundy)",
                            display: "flex", flexDirection: "column", alignItems: "center"  }}>
                            {(examples[period.id]?.length > 0)
                                ? examples[period.id].map(a => (
                                    <li key={a.id}>
                                        <Link to={`/artifacts/${a.id}`} style={{color:"var(--burgundy)", textDecoration:"None"}}>
                                            {a.name}
                                        </Link>
                                    </li>
                                ))
                                : <li>Пока ещё никто не рассказал о предмете этого века, будь первым</li>
                            }
                        </ul>
                    </div>
                </section>
            ))}
        </div>
    );
}

export default PeriodsInfoPage;
