import { Link } from 'react-router-dom';

const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    zIndex: 10,
    background: 'var(--burgundy)',
    color: 'var(--white)',
    padding: '0.5rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    boxShadow: '0 2px 10px rgba(76,6,1,0.07)',
};

const linkStyle = {
    color: 'var(--white)',
    textDecoration: 'none',
    margin: '0 1.2rem',
    fontWeight: 500,
    fontSize: '1.1rem',
    whiteSpace: 'nowrap'
};

function Navbar() {
    return (
        <nav style={navStyle}>
            <div style={{ fontWeight: 700, fontSize: '1.3rem', letterSpacing: '.02em' }}>
                Незабываемое
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Link to="/artifacts" style={linkStyle}>Экспонаты</Link>
                <Link to="/authors" style={linkStyle}>Авторы</Link>
                <Link to="/categories" style={linkStyle}>Виды творчества</Link>
                <Link to="/periods" style={linkStyle}>Периоды</Link>
                <Link to="/map" style={linkStyle}>География</Link>
                <Link to="/news" style={linkStyle}>Новости</Link>
                <Link to="/partners" style={linkStyle}>Партнёры</Link>
                <Link to="/about" style={linkStyle}>О проекте</Link>
                <Link to="/contacts" style={linkStyle}>Контакты</Link>
            </div>
            <div>
                <Link to="/add" style={{ ...linkStyle, color: 'var(--gold)', fontWeight: 700 }}>
                    + Рассказать о своём предмете
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
