import { useState } from "react";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import { getDocument, updateDocumentTitle, deleteDocument } from "./api.js";
import { useAuth } from "./context/AuthContext.jsx";
import { useEffect } from "react";

export default function EditSingleDocument() {
    const { id } = useParams();
    console.log(id)
    const [document, setDocument] = useState([])
    const [title, setTitle] = useState(document.title)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const { token } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        const updatedAt = Date();
        event.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await updateDocumentTitle(token, id, title)
            navigate('/documents')
        } catch {
            setError("Något i uppdateringen gick fel")
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(event) {
        event.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await deleteDocument(id)
            navigate('/documents')
        } catch {
            setError("Något gick fel, dokumentet kunde inte raderas")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getDocument(id)
        .then(data => setDocument(data.data))
        .catch(setError)
        .finally(() => setLoading(false))
    }, [id])

    if (error) return <p>Kunde inte läsa in dokumentet.</p>
    if (loading) return <p>Hämtar datan...</p>

    return (
        <div className="auth-form">
            <h2>Redigera inställningar</h2>
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <label>
                    Nuvarande titel: {document.title}
                    <input
                        type="text"
                        defaultValue={document.title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </label>
                <button
                    type="submit"
                    disabled={loading}
                >
                    Uppdatera
                </button>
            </form>

            <form onSubmit={handleDelete}>
                <button
                    className="delete-button"
                    type="submit"
                    disabled={loading}
                >
                    Radera
                </button>
            </form>
                            <Link to="/">&larr; Tillbaka</Link>
        </div>
    )
}