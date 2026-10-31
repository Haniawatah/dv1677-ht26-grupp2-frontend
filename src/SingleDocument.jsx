import { useCallback, useEffect, useState, useRef } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { getDocument, getDocuments, updateDocument } from "./api.js";
import { Editor } from "@monaco-editor/react";

const AUTOSAVE_DELAY = 1000

export default function SingleDocument() {
    const { id } = useParams()
    const [document, setDocument] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const editorRef = useRef(null)
    const autosaveRef = useRef(null)
    const [cursorPos, setCursorPos]   = useState({ line: 1, column: 1 })
    const [saveStatus, setSaveStatus] = useState('saved') // 'saved' | 'saving' | 'error'
  

    useEffect(() => () => clearTimeout(autosaveRef.current), [])

    // Sätt alla variabler för editorn utifrån hämtat dokument
    useEffect(() => {
        if (typeof content === "undefined") {
            setContent(document.content)
        }
        if (typeof title === "undefined") {
            setTitle(document.title)
        }
    })
    // console.log("title")
    // console.log(title)
    // console.log("content")
    // console.log(content)

    const scheduleSave = useCallback((content) => {
        // console.log("Kommer vi hit?")
        clearTimeout(autosaveRef.current)
        setSaveStatus("saving")

        // console.log("Innte i scheduleSave")
        // console.log(title)
        // console.log(content)
        autosaveRef.current = setTimeout(async () => {
            try {
                await updateDocument(id, content)
                // await updateDocument(id, title, content)
                setSaveStatus("saved")
            } catch {
                setSaveStatus("error")
            }
        }, AUTOSAVE_DELAY)
    }, [id])

    function handleEditorDidMount(editor) {
        // console.log("Kommer vi hit, handleEditor?")
        // console.log(title)
        editorRef.current = editor

        editor.onDidChangeModelContent(e => {
            const content = editor.getValue()
            setTitle(document.title)
            scheduleSave(content)
            // scheduleSave(title, content)
            setContent(content)
        })
    }

    // Om ett textfält uppdateras så skickas detta till databasen
    function updateInput(content) {
        // console.log("Inne i updateInput:")
        setContent(content)
        scheduleSave(content)
    }

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
                            <div className="doc-link-cell">
                                <Link to={`/documents/${doc._id}`}>{doc.title}</Link>
                            </div>
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
                            defaultValue={document.content}
                            onMount={handleEditorDidMount}
                            theme="vs-dark"
                            options={{
                            minimap: { enabled: false },
                            lineNumbers: 'on',
                            fontSize: 14
                            }}
                        />
                        </div>

                        <div className="editor-statusbar">
                            <span className={`save-status save-status--${saveStatus}`}>
                            {saveStatus === 'saved'  && '✓ Sparad'}
                            {saveStatus === 'saving' && '↻ Sparar…'}
                            {saveStatus === 'error'  && '✕ Sparfel'}
                            </span>
                        </div>
                        <Link to="/">&larr; Tillbaka</Link>
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
                            <div className="doc-link-cell">
                                <Link to={`/documents/${doc._id}`}>{doc.title}</Link>
                            </div>
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
                            <textarea
                                className="document-text-area"
                                defaultValue={document.content}
                                onChange={(event) => updateInput((event.target.value))}
                            />
                        </div>
                        <div className="editor-statusbar">
                            <span className={`save-status save-status--${saveStatus}`}>
                            {saveStatus === 'saved'  && '✓ Sparad'}
                            {saveStatus === 'saving' && '↻ Sparar…'}
                            {saveStatus === 'error'  && '✕ Sparfel'}
                            </span>
                        </div>
                            <Link to="/">&larr; Tillbaka</Link>
                </div>
            </div>
            </>
        )
    }
}