import '/src/styles/AddArtifactPage.css';
import { useState, useRef } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000"; // замени на свой

const techniqueOptions = [
    "Вышивка", "Резьба по дереву", "Керамика", "Ткачество", "Кузнечное дело"
];

export default function AddArtifactPage() {
    const [form, setForm] = useState({
        full_name: "",
        phone: "",
        email: "",
        object_name: "",
        materials: "",
        technique: "",
        creation_date: "",
        story: "",
        author_known: false,
        author_full_name: "",
        author_info: "",
        agree: false,
        captcha: ""
    });
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInput = useRef(null);

    function validate() {
        let errs = {};
        if (!form.full_name) errs.full_name = "Укажите ФИО";
        if (!/^\+?\d{10,20}$/.test(form.phone)) errs.phone = "Введите корректный номер (10-20 цифр)";
        if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(form.email)) errs.email = "Введите корректный email";
        if (!form.object_name) errs.object_name = "Введите название";
        if (!form.materials) errs.materials = "Введите материалы";
        if (!form.technique) errs.technique = "Выберите или введите технику";
        if (files.length === 0) errs.files = "Загрузите хотя бы одно фото (jpg, png, pdf)";
        if (!form.story) errs.story = "Опишите историю предмета";
        if (!form.agree) errs.agree = "Необходимо согласие";
        if (!form.captcha) errs.captcha = "Введите результат";
        return errs;
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    function handleFiles(e) {
        setFiles(Array.from(e.target.files));
        setErrors(prev => ({ ...prev, files: undefined }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length) return;

        setLoading(true);
        try {
            // Первый шаг — отправка основной формы
            const res = await axios.post(`${API_URL}/artifacts`, {
                name: form.object_name,
                materials: form.materials,
                technique: form.technique,
                creation_date: form.creation_date,
                story: form.story,
                applicant: {
                    full_name: form.full_name,
                    phone: form.phone,
                    email: form.email
                },
                author: form.author_known
                    ? {
                        full_name: form.author_full_name,
                        info: form.author_info
                    }
                    : { full_name: "Автор неизвестен" }
            });
            const artifact_id = res.data.id;

            // Второй шаг — загрузка файлов
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("artifact_id", artifact_id);
                await axios.post(`${API_URL}/upload`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            setSent(true);
        } catch (err) {
            setErrors({ api: "Ошибка отправки. Проверьте данные." });
        } finally {
            setLoading(false);
        }
    }

    if (sent)
        return (
            <div className="add-form-container">
                <div className="add-form-success">
                    Спасибо! Ваша заявка отправлена. После проверки модератор свяжется с вами.
                </div>
            </div>
        );

    // Простая капча (замени, если подключишь реальную)
    const captchaQuest = "2 + 3 = ?";
    const captchaAnswer = "5";

    return (
        <div className="add-form-container">
            <div className="add-form-title">Рассказать о своём предмете</div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="add-form-row">
                    <label>Ваше ФИО *</label>
                    <input
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {errors.full_name && <div style={{color:'red'}}>{errors.full_name}</div>}
                </div>
                <div className="add-form-row">
                    <label>Телефон *</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+79991234567"
                        disabled={loading}
                    />
                    {errors.phone && <div style={{color:'red'}}>{errors.phone}</div>}
                </div>
                <div className="add-form-row">
                    <label>Email *</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {errors.email && <div style={{color:'red'}}>{errors.email}</div>}
                </div>
                <div className="add-form-row">
                    <label>Название предмета *</label>
                    <input
                        name="object_name"
                        value={form.object_name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {errors.object_name && <div style={{color:'red'}}>{errors.object_name}</div>}
                </div>
                <div className="add-form-row">
                    <label>Материалы *</label>
                    <input
                        name="materials"
                        value={form.materials}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {errors.materials && <div style={{color:'red'}}>{errors.materials}</div>}
                </div>
                <div className="add-form-row">
                    <label>Техника *</label>
                    <select
                        name="technique"
                        value={form.technique}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        <option value="">— Выберите —</option>
                        {techniqueOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                        <option value="Другое">Другое</option>
                    </select>
                    {form.technique === "Другое" && (
                        <input
                            name="technique"
                            placeholder="Введите технику"
                            onChange={handleChange}
                            disabled={loading}
                            style={{marginTop:".4em"}}
                        />
                    )}
                    {errors.technique && <div style={{color:'red'}}>{errors.technique}</div>}
                </div>
                <div className="add-form-row">
                    <label>Год/век создания</label>
                    <input
                        name="creation_date"
                        value={form.creation_date}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Например, 1956 или XIX век"
                    />
                </div>
                <div className="add-form-row">
                    <label>История предмета *</label>
                    <textarea
                        name="story"
                        value={form.story}
                        onChange={handleChange}
                        disabled={loading}
                        maxLength={900}
                    />
                    {errors.story && <div style={{color:'red'}}>{errors.story}</div>}
                </div>
                <div className="add-form-row">
                    <label className="file-input-label">
                        Фото / PDF (до 5 МБ, jpg, png, pdf) *
                    </label>
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        multiple
                        onChange={handleFiles}
                        ref={fileInput}
                        disabled={loading}
                    />
                    {errors.files && <div style={{color:'red'}}>{errors.files}</div>}
                </div>
                <div className="add-form-row">
                    <label>
                        <input
                            type="checkbox"
                            name="author_known"
                            checked={form.author_known}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        Известен автор предмета
                    </label>
                </div>
                {form.author_known && (
                    <>
                        <div className="add-form-row">
                            <label>ФИО автора</label>
                            <input
                                name="author_full_name"
                                value={form.author_full_name}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="add-form-row">
                            <label>Информация об авторе (не публикуется)</label>
                            <textarea
                                name="author_info"
                                value={form.author_info}
                                onChange={handleChange}
                                disabled={loading}
                                maxLength={400}
                            />
                        </div>
                    </>
                )}
                <div className="add-form-checkbox">
                    <input
                        type="checkbox"
                        name="agree"
                        checked={form.agree}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <span>
            Я согласен на обработку персональных данных и бессрочное использование фото ({" "}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer">правила</a> )
          </span>
                </div>
                {errors.agree && <div style={{color:'red'}}>{errors.agree}</div>}

                <div className="add-form-row">
                    <label>Капча: {captchaQuest} *</label>
                    <input
                        name="captcha"
                        value={form.captcha}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Введите ответ"
                    />
                    {errors.captcha && <div style={{color:'red'}}>{errors.captcha}</div>}
                </div>

                <button className="add-form-btn" type="submit" disabled={loading}>
                    Отправить
                </button>
                {errors.api && <div style={{color:'red',marginTop:12}}>{errors.api}</div>}
            </form>
        </div>
    );
}
