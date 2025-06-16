import '/src/styles/ArtifactsPage.css';

function ContactsPage() {
    return (
        <div style={{maxWidth: 700, margin: "0 auto", padding: "2.5rem 1.2rem 1.2rem 1.2rem"}}>
            <h1 style={{textAlign: "center", color: "var(--burgundy)", marginBottom: "1.7rem"}}>Контакты</h1>
            <section style={{
                background: "var(--beige)",
                borderRadius: 18,
                boxShadow: "0 3px 18px rgba(208,166,131,0.13)",
                padding: "2.1rem 2rem",
                color: "var(--burgundy)",
                fontSize: "1.12em"
            }}>
                <div style={{marginBottom: "1.1rem"}}>
                    <strong style={{color: "var(--gold)", fontSize: "1.12em"}}>Наш адрес:</strong>
                    <div style={{marginLeft: "1.4em"}}>
                        620075 (620151)<br />
                        г. Екатеринбург, ул. Гоголя, 20/5
                    </div>
                </div>
                <div style={{marginBottom: "1.1rem"}}>
                    <strong style={{color: "var(--gold)", fontSize: "1.12em"}}>Телефоны:</strong>
                    <div style={{marginLeft: "1.4em", lineHeight: "1.7"}}>
                        <a href="tel:+73433715576" style={{color: "var(--burgundy)", textDecoration: "underline"}}>+7 (343) 371-55-76</a>,{" "}
                        <a href="tel:+73433712041" style={{color: "var(--burgundy)", textDecoration: "underline"}}>371-20-41</a><br/>
                        <a href="tel:+79326010242" style={{color: "var(--burgundy)", textDecoration: "underline"}}>+7 932-601-02-42</a>
                    </div>
                </div>
                <div style={{marginBottom: "1.1rem"}}>
                    <strong style={{color: "var(--gold)", fontSize: "1.12em"}}>E-mail:</strong>
                    <div style={{marginLeft: "1.4em"}}>
                        <a href="mailto:gamaun@ekadm.ru" style={{color: "var(--burgundy)", textDecoration: "underline"}}>gamaun@ekadm.ru</a>
                    </div>
                </div>
                <div>
                    <strong style={{color: "var(--gold)", fontSize: "1.12em"}}>Время работы:</strong>
                    <div style={{marginLeft: "1.4em"}}>
                        вт. – пт.  10:00 — 18:00<br/>
                        сб.        10:00 — 17:00<br/>
                        вс. – пн.  выходной
                    </div>
                </div>
            </section>
            <div style={{textAlign: "center", marginTop: "2.2rem", color: "var(--gold)", fontSize: "1.01em"}}>
                По всем вопросам — пишите или звоните, всегда рады сотрудничеству!
            </div>
        </div>
    );
}

export default ContactsPage;
