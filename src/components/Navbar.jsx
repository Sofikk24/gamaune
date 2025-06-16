import { Link } from 'react-router-dom';
import { useState } from "react";
import '/src/styles/palette.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="nav-root" style={{justifyContent: "space-evenly"}}>
            <div className="nav-brand">
                <Link to="/gamaune/" onClick={() => setMenuOpen(false)}>
                    Гамаюн
                </Link>
            </div>
            <button className="nav-burger" onClick={() => setMenuOpen(o => !o)} aria-label="Меню">
                <span />
                <span />
                <span />
            </button>
            {/* Ссылки — на десктопе всегда видны, на мобиле скрыты */}
            <div className={`nav-links${menuOpen ? " nav-mobile-open" : ""}`}>
                <Link to="/artifacts" onClick={() => setMenuOpen(false)}>Экспонаты</Link>
                <Link to="/authors" onClick={() => setMenuOpen(false)}>Авторы</Link>
                <Link to="/categories" onClick={() => setMenuOpen(false)}>Виды творчества</Link>
                <Link to="/periods" onClick={() => setMenuOpen(false)}>Периоды</Link>
                {/*<Link to="/map" onClick={() => setMenuOpen(false)}>География</Link>*/}
                <Link to="/partners" onClick={() => setMenuOpen(false)}>Партнёры</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>О проекте</Link>
                <Link to="/contacts" onClick={() => setMenuOpen(false)}>Контакты</Link>
                <Link to="/add" style={{fontSize:"1.1rem"}} onClick={() => setMenuOpen(false)}>
                    Рассказать о своём предмете
                </Link>
            </div>
            {/* Overlay для закрытия меню по клику вне его */}
            {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
        </nav>
    );
}

export default Navbar;
