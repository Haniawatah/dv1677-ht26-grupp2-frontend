import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDocument, getDocuments } from "./api.js";
import { Editor } from "@monaco-editor/react";

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

    const [documents, setDocuments] = useState([])
    const [errordocs, setErrordocs] = useState(null)
    const [loadingdocs, setLoadingdocs] = useState(true)

    useEffect(() => {
        getDocuments()
        .then(data => setDocuments(data.data))
        .catch(setErrordocs)
        .finally(() => setLoadingdocs(false))
    }, [])

    if (error) return <p>Kunde inte läs in dokumentet.</p>
    if (loading) return <p>Hämtar data...</p>

    // console.log(id);
    console.log(document);

    if (document.type == "code") {
        return (
            <>
            <div className="main-box">
                <div className="left-box">
                    <div className="left-title">
                        Senaste dokumenten
                    </div>
                    <div className="document-box">
                        <p>
                            Här ska de fem? senaste redigerade dokumenten vara.
                        </p>
                        <ul>
                        {documents.map((doc) => (
                            <>
                                <li key="{doc._id}">{doc.title}</li>
                            </>
                            ))}
                        </ul>
                    </div>

                </div>
                <div className="right-box">
                    <div className="doc-title-box">
                        <h2>
                            {document.title}
                        </h2>
                    </div>

                    <div className="editor-window">
                        <Editor
                            height="60vh"
                            language="javascript"
                            // language={language}          // 'javascript', 'python', 'json', ...
                            value={document.content}
                            // onChange={onChange}
                            theme="vs-dark"
                            options={{
                            minimap: { enabled: false },
                            fontSize: 14
                            }}
                        />

                        
                    
                        <Link to="/">&larr; Tillbaka</Link>
                    </div>

                </div>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div className="main-box">
                <div className="left-box">
                    <div className="left-title">
                        Senaste dokumenten
                    </div>
                    <div className="document-box">
                        <p>
                            Här ska de fem? senaste redigerade dokumenten vara.
                        </p>
                        <ul>
                        {documents.map((doc) => (
                            <>
                                <li key="{doc._id}">{doc.title}</li>
                            </>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="right-box">
                    <div className="doc-title-box">
                        <h2>
                            {document.title}
                        </h2>
                    </div>

                    <div className="editor-window">
                        
                    <div>
                        {/* <p>Dokument med _id: {id}</p> */}

                        <textarea className="document-text-area">
                            {document.content}
                        </textarea>
                        
                    </div>
                    
                        <Link to="/">&larr; Tillbaka</Link>
                    </div>

                </div>
            </div>
            </>
        )
    }
}