import { useState } from "react";
import axios from "axios";
import '/src/styles/LoginPage.css'; // файл стилей, смотри ниже
const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await axios.post(`${API_URL}/login`, form, { withCredentials: true });
            window.location.href = "/admin"; // путь после логина, поменяй если надо
        } catch (err) {
            setError(err.response?.data?.error || "Ошибка входа. Проверьте логин и пароль.");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="auth-root">
            <div className="auth-form">
                <h2 className="auth-title">Вход администратора</h2>
                <form onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="username"
                            placeholder="admin@mail.ru"
                            style={{width:"80%"}}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            style={{width:"80%"}}
                            onChange={handleChange}
                            autoComplete="current-password"
                            placeholder="Введите пароль"
                            disabled={loading}
                            required
                        />
                    </div>
                    <button className="auth-btn" type="submit" disabled={loading}>
                        {loading ? "Вход..." : "Войти"}
                    </button>
                    {error && <div className="auth-error">{error}</div>}
                </form>
            </div>
        </div>
    );
}
