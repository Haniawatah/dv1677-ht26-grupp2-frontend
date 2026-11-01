import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createDocument } from "./api.js";

export default function CreateDocument() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    // The document type is always text in this case, so it is a plain constant.
    const type = 'text'
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(event) {
        const createdAt = Date();
        const updatedAt = Date();
        event.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await createDocument(title, content, type, createdAt, updatedAt)
            navigate('/documents')
        } catch {
            setError('Något gick fel, kunde inte skapa dokumentet.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-form auth-form--wide">
            <h2>Skapa Textdokument</h2>
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <label>
                     Titel
                     <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </label>

                <label>
                     Innehåll
                     <textarea
                        name="content"
                        rows={18}
                        defaultValue={content}
                        onChange={(event) => setContent(event.target.value)}
                        required
                    />
                </label>

                <button 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? 'Skapar dokument...' : 'Skapa dokument'}
                </button>
            </form>
        </div>
    )
}
