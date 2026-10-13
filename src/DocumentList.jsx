import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocuments } from "./api.js";

export default function DocumentList() {
  const [documents, setDocuments] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDocuments()
      .then(data => setDocuments(data.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Hämtar data...</p>

  // Felhanteringen är med av ett skäl: när CORS saknas i backend misslyckas
  // fetch() i webbläsaren men fungerar i curl. Utan ett synligt felmeddelande
  // ser man bara en tom sida och vet inte varför.
  if (error) {
    return (
      <div className="error">
        <p><strong>Kunde inte hämta dokumenten:</strong> {error.message}</p>
        <p>
          Öppna webbläsarens konsol. Står det <em>blocked by CORS policy</em> saknar
          backend <code>cors</code>-middleware — se README.
        </p>
      </div>
    )
  }

  console.log(documents);
  return (
    <>
      <h2>Hel lista med dokument från backend</h2>
      <p>{documents.length} dokument finns på servern.</p>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <Link to={`/documents/${doc._id}`}>
              <span>{doc.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}