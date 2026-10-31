import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDocument } from "./api.js";
import Comments from "./components/Comments.jsx";

export default function SingleDocument() {
    const { id } = useParams()
    const [document, setDocument] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDocument(id)
        .then(data => setDocument(data.data))
        .catch(setError)
        .finally(() => setLoading(false))
    }, [id])

    if (error) return <p>Kunde inte läs in dokumentet.</p>
    if (loading) return <p>Hämtar datan...</p>

    return (
        <div>
            <Link to="/">&larr; tillbaka</Link>
            <p>Dokument med _id: {id}</p>
            <h1>{document.title}</h1>

            <p>
                {document.content}
            </p>
            <Comments documentId={id} />
        </div>
    )
}