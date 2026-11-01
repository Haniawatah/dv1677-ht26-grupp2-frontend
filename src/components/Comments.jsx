import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getComments, createComment, deleteComment } from "../api.js";
import "../Comments.css";

export default function Comments({ documentId }) {
    const { user } = useAuth()
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [line, setLine] = useState(1)
    const [text, setText] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState(null)

    // Load the comments when the document changes
    useEffect(() => {
        getComments(documentId)
            .then(data => setComments(data.data))
            .catch(setError)
            .finally(() => setLoading(false))
    }, [documentId])

    // Fetch the list again after a comment is added or deleted
    function reloadComments() {
        getComments(documentId)
            .then(data => setComments(data.data))
            .catch(err => setFormError(err.message))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setFormError(null)
        setSubmitting(true)

        try {
            await createComment(documentId, line, text)
            setText("")
            reloadComments()
        } catch (err) {
            setFormError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    function handleDelete(commentId) {
        deleteComment(documentId, commentId)
            .then(() => reloadComments())
            .catch(err => setFormError(err.message))
    }

    if (error) return <p className="error">Kunde inte hämta kommentarerna.</p>

    return (
        <div className="comments-section">
            <h3>Kommentarer</h3>

            {formError && <div className="error">{formError}</div>}

            {loading ? (
                <p>Laddar kommentarer...</p>
            ) : comments.length === 0 ? (
                <p>Inga kommentarer än.</p>
            ) : (
                <ul className="comment-list">
                    {comments.map((c) => (
                        <li key={c._id} className="comment-item">
                            <div className="comment-header">
                                <strong>{c.authorEmail}</strong>
                                <span>Rad {c.line}</span>
                                <span>{c.createdAt ? c.createdAt.slice(0, 10) : ""}</span>
                            </div>
                            <p className="comment-text">{c.text}</p>
                            {user && c.author === user.id && (
                                <button
                                    className="comment-delete"
                                    onClick={() => handleDelete(c._id)}
                                >
                                    Ta bort
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit} className="comment-form">
                <h4>Ny kommentar</h4>
                <label>
                    Radnummer
                    <input
                        type="number"
                        min={1}
                        value={line}
                        onChange={(e) => setLine(Number(e.target.value))}
                        required
                    />
                </label>
                <label>
                    Kommentar
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        maxLength={500}
                    />
                </label>
                <button type="submit" disabled={submitting}>
                    {submitting ? "Sparar..." : "Skicka"}
                </button>
            </form>
        </div>
    )
}