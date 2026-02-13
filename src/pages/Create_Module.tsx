import React, { useState } from "react";
import './Create_Module.css';
import UIInput from "../components/ui/Input";
import UISelect from "../components/ui/Select";
import doneIcon from "../assets/interface/done.svg";
import PlusIcon from "../assets/interface/plus.svg";
import StartCreate from '../assets/interface/start_create.svg';

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
    const [moduleName, setModuleName] = useState("");
    const [noun, setNoun] = useState("");
    const [article, setArticle] = useState("");
    const [translation, setTranslation] = useState("");
    const [entries, setEntries] = useState<NounEntry[]>([{ noun: "Test", article: "die", translation: "testing" }]);
    const [error, setError] = useState("");

    const [showInfo, setShowInfo] = useState(true);
    const infoButtonRef = React.useRef<HTMLButtonElement>(null);
    const modalRef = React.useRef<HTMLDivElement>(null);


    const handleAdd = () => {
        if (!noun.trim() || !translation.trim()) {
            setError("Word and translation are required:)");
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

                        <button onClick={closeModal} className="close-module-button">
                            OK, start creating
                            <img src={StartCreate} aria-hidden="true" />
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
                {/* Horizontal layout container */}
                <div className="module-creator-container">
                    {/* Module Settings */}
                    <fieldset className="module-settings">
                        <legend>Module Settings</legend>

                        <UISelect
                            id="language-select"
                            label="Choose language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            required
                            options={[
                                { value: "German", label: "German" },
                                { value: "French", label: "French" },
                                { value: "Dutch", label: "Dutch" },
                                { value: "Portuguese", label: "Portuguese" },
                                { value: "Italian", label: "Italian" },
                                { value: "Spanish", label: "Spanish" },
                            ]}
                        />
                        <UIInput
                            id="module-name"
                            label="Module Name"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            required
                            placeholder="Enter module name"
                            size="small"
                        />

                        <div className="word-count" aria-live="polite">
                            <span className={`word-count-icon ${entries.length > 0 ? "active" : ""}`} aria-hidden="true">
                                <img src={doneIcon} alt="" />
                            </span>
                            <span
                                className="word-count-number"
                                aria-label={entries.length === 0 ? "No words added" : `${entries.length} words added`}
                            >
                                {entries.length}
                            </span>
                        </div>
                    </fieldset>

                    {/* Add Word Section */}
                    <section aria-labelledby="add-word-heading">
                        <h2 id="add-word-heading" className="add-word-heading">Add a Word</h2>

                        <div className="input-layout">
                            {/* Top input */}
                            <UIInput
                                id="noun"
                                label="Noun"
                                value={noun}
                                onChange={(e) => setNoun(e.target.value)}
                                required
                                placeholder="Enter noun"
                                size="large"
                            />

                            {/* Bottom row: Article + Translation */}
                            <div className="input-row">
                                <UIInput
                                    id="article"
                                    label="Article (optional)"
                                    value={article}
                                    onChange={(e) => setArticle(e.target.value)}
                                    placeholder="Enter article"
                                    size="middle"
                                />

                                <UIInput
                                    id="translation"
                                    label="Translation"
                                    value={translation}
                                    onChange={(e) => setTranslation(e.target.value)}
                                    required
                                    placeholder="Enter translation"
                                    size="large"
                                />
                            </div>
                        </div>

                        {/* Error message */}
                        <div
                            role="alert"
                            aria-live="assertive"
                            style={{ color: "red" }}
                        >
                            {error}
                        </div>

                        <button type="button" onClick={handleAdd} className="add-button">
                            <img src={PlusIcon} aria-hidden="true" />
                            Add a word
                        </button>
                    </section>

                    {/* Preview Section */}
                    <section className="module-preview-section" aria-labelledby="preview-heading">
                        <h2 id="preview-heading" className="preview-heading">Module Preview</h2>

                        {entries.length === 0 ? (
                            <p>No words added yet.</p>
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
            </div>
        </>
    );
};

export default Create_Module;
