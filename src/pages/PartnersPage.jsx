import '/src/styles/ArtifactsPage.css';
import placeholderImg from '/src/assets/placeholder.jpg';

const PARTNERS = [
    {
        name: "Муниципальный культурный центр «Гамаюн»",
        description: "Главный партнёр проекта, предоставивший коллекцию и экспертную поддержку при описании экспонатов.",
        logo: placeholderImg, // если нет — оставь пустым
        url: "https://гамаюн.екатеринбург.рф/"
    },
    {
        name: "Администрация города",
        description: "Поддержка информационных кампаний, продвижение и участие в проведении выставок.",
        logo: "", // нет лого
        url: ""
    },
    {
        name: "Историко-краеведческий музей",
        description: "Совместные исследовательские проекты, обмен данными о культурном наследии муниципалитета.",
        logo: "",
        url: ""
    }
    // Добавь новых партнёров по мере необходимости
];

function PartnersPage() {
    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 1.2rem 1.2rem 1.2rem" }}>
            <h1 style={{ textAlign: "center", color: "var(--burgundy)", marginBottom: "2rem", fontFamily: "Impact, Regular" }}>Наши партнёры</h1>
            <p style={{ color: "var(--burgundy)", fontSize: "1.13em", marginBottom: "2.1rem", textAlign: "center" }}>
                Проект «Незабываемое: рукотворная память» реализуется совместно с муниципальными и культурными организациями, чья поддержка делает сохранение и популяризацию культурного наследия возможными.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.7rem" }}>
                {PARTNERS.map((p, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1.7rem",
                            background: "var(--beige)",
                            borderRadius: 18,
                            boxShadow: "0 3px 18px rgba(208,166,131,0.13)",
                            padding: "1.3rem 2rem"
                        }}
                    >
                        {/* Лого */}
                        {p.logo
                            ? (
                                <img
                                    src={p.logo}
                                    alt={p.name}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        objectFit: "contain",
                                        borderRadius: 12,
                                        background: "var(--white)",
                                        border: "1px solid var(--gold-block)"
                                    }}
                                    onError={e => { e.target.style.display = "none"; }}
                                />
                            )
                            : <div style={{ width: 60, height: 60, borderRadius: 12, background: "var(--white)", border: "1px solid var(--gold-block)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", fontWeight: 700, fontSize: "1.8rem" }}>?</div>
                        }
                        {/* Текст */}
                        <div>
                            <div style={{ color: "var(--burgundy)", fontWeight: 700, fontSize: "1.17em", marginBottom: ".18em" }}>
                                {p.url
                                    ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--burgundy)", textDecoration: "underline" }}>{p.name}</a>
                                    : p.name
                                }
                            </div>
                            <div style={{ color: "var(--burgundy)", fontSize: "1.03em" }}>{p.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PartnersPage;
