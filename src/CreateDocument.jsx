import { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { createDocument } from "./api.js";

export default function CreateDocument() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('text')
    const [owner, setOwner] = useState('')
    // const [createdAt, setCreatedAt] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(event) {
        const createdAt = Date();
        const updatedAt = Date();
        // await setVariables()
        event.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await createDocument(title, content, type, owner, createdAt, updatedAt)
            navigate('/documents')
        } catch {
            setError('Något gick fel, kunde inte skapa dokumentet.')
        } finally {
            setLoading(false)
        }
    }

    // function setVariables() {
    //     console.log("hamnar den här?")
    // }

    return (
        <div className="auth-form">
            <h2>Skapa dokument</h2>
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
                        rows={8}
                        cols={100}
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
