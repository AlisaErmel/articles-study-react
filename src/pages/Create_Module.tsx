import React, { useState } from "react";
import './Create_Module.css';

type Language =
    | "German"
    | "French"
    | "Dutch"
    | "Portuguese"
    | "Italian"
    | "Spanish";

interface NounEntry {
    noun: string;
    article?: string;
    translation: string;
}

const Create_Module: React.FC = () => {
    const [language, setLanguage] = useState<Language>("German");
    const [noun, setNoun] = useState("");
    const [article, setArticle] = useState("");
    const [translation, setTranslation] = useState("");
    const [entries, setEntries] = useState<NounEntry[]>([]);
    const [error, setError] = useState("");

    const [showInfo, setShowInfo] = useState(true);
    const infoButtonRef = React.useRef<HTMLButtonElement>(null);
    const modalRef = React.useRef<HTMLDivElement>(null);


    const handleAdd = () => {
        if (!noun.trim() || !translation.trim()) {
            setError("Noun and translation are required:)");
            return;
        }

        const newEntry: NounEntry = {
            noun,
            translation,
            article: article || undefined,
        };

        setEntries([...entries, newEntry]);
        setNoun("");
        setArticle("");
        setTranslation("");
        setError("");
    };

    const closeModal = () => {
        setShowInfo(false);
        infoButtonRef.current?.focus(); // return focus to button
    };

    React.useEffect(() => {
        if (!showInfo) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Move focus into modal
        setTimeout(() => {
            modalRef.current?.focus();
        }, 0);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showInfo]);

    return (
        <>
            {showInfo && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    className="modal-overlay"
                    onClick={closeModal}
                >
                    <div
                        className="modal-content"
                        tabIndex={-1}
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 id="modal-title">About Creating a Module</h2>

                        <p id="modal-description">
                            Here you can create your own vocabulary module.
                            Add nouns, optionally include articles,
                            and practice them later.
                        </p>

                        <button onClick={closeModal}>
                            OK, start creating
                        </button>
                    </div>
                </div>
            )}

            <div aria-hidden={showInfo}>

                <div className="header-with-info">

                    <h1>Create Your Own Module</h1>

                    <button
                        ref={infoButtonRef}
                        onClick={() => setShowInfo(true)}
                        className="info-button"
                        aria-label="Open module information"
                    >
                        ℹ Info
                    </button>
                </div>

                <p id="module-description">
                    Create your own vocabulary module to practice articles with nouns.
                    Articles are optional, if you want to practice also verbs, adjectives...
                </p>

                {/* Language Selection */}
                <fieldset>
                    <legend>Select Language</legend>

                    <label htmlFor="language-select">
                        Choose language
                    </label>

                    <select
                        id="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        aria-describedby="module-description"
                    >
                        <option value="German">German</option>
                        <option value="French">French</option>
                        <option value="Dutch">Dutch</option>
                        <option value="Portuguese">Portuguese</option>
                        <option value="Italian">Italian</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                </fieldset>

                {/* Add Noun Section */}
                <section aria-labelledby="add-noun-heading">
                    <h2 id="add-noun-heading">Add Noun</h2>

                    <div>
                        <label htmlFor="noun-input">
                            Noun <span aria-hidden="true">*</span>
                        </label>
                        <input
                            id="noun-input"
                            type="text"
                            value={noun}
                            onChange={(e) => setNoun(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="article-input">
                            Article (optional)
                        </label>
                        <input
                            id="article-input"
                            type="text"
                            value={article}
                            onChange={(e) => setArticle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="translation-input">
                            Translation <span aria-hidden="true">*</span>
                        </label>
                        <input
                            id="translation-input"
                            type="text"
                            value={translation}
                            onChange={(e) => setTranslation(e.target.value)}
                            required
                        />
                    </div>

                    {/* Error message */}
                    <div
                        role="alert"
                        aria-live="assertive"
                        style={{ color: "red" }}
                    >
                        {error}
                    </div>

                    <button onClick={handleAdd}>
                        Add noun
                    </button>
                </section>

                {/* Preview Section */}
                <section aria-labelledby="preview-heading">
                    <h2 id="preview-heading">Module Preview</h2>

                    {entries.length === 0 ? (
                        <p>No nouns added yet.</p>
                    ) : (
                        <ul>
                            {entries.map((entry, index) => (
                                <li key={index}>
                                    {entry.article ? `${entry.article} ` : ""}
                                    {entry.noun} – {entry.translation}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </>
    );
};

export default Create_Module;
