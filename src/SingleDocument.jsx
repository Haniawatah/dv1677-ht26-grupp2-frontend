import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDocument } from "./api.js";

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
    if (loading) return <p>Hämtar data...</p>

    // console.log(id);
    console.log(document);
    return (
        <div>
            <Link to="/documents">&larr; Tillbaka</Link>
            <p>Dokument med _id: {id}</p>
            <h1>{document.title}</h1>

            <p>
                {document.content}
            </p>
        </div>
    )
}