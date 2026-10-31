import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { createDocument } from "./api.js";
import { Editor } from "@monaco-editor/react";

export default function CreateCode() {
    const [title, setTitle] = useState('')
    // const [content, setContent] = useState('')
    // The document type is always code in this editor, so it is a plain constant.
    const type = 'code'
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const editorRef = useRef(null)

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    async function handleSubmit(event) {
        const createdAt = Date();
        const updatedAt = Date();
        event.preventDefault()
        setError(null)
        setLoading(true)
        const content = editorRef.current.getValue()
        console.log(content)

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
        <div className="auth-form">
            <h2>Skapa Kod-dokument</h2>
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
                     <Editor
                        name="content"
                        height="60vh"
                        language="javascript"
                        // language={language}          // 'javascript', 'python', 'json', ...
                        // defaultValue={content}
                        // onChange={(event) => setContent(event.target.value)}
                        onMount={handleEditorDidMount}
                        theme="vs-dark"
                        options={{
                        minimap: { enabled: false },
                        lineNumbers: 'on',
                        fontSize: 14
                        }}
                    />
                     {/* <textarea
                        name="content"
                        rows={8}
                        cols={100}
                        defaultValue={content}
                        required
                    /> */}
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
