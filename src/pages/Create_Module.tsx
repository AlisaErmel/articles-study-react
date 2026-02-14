import React, { useState } from "react";
import './Create_Module.css';
import UIInput from "../components/ui/Input";
import UISelect from "../components/ui/Select";
import doneIcon from "../assets/interface/done.svg";
import PlusIcon from "../assets/interface/plus.svg";
import StartCreate from '../assets/interface/start_create.svg';
import ArrowButton from "../components/ui/ArrowButton";

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

    const [activeSection, setActiveSection] = useState<string>("module-settings");

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
        document.getElementById("noun")?.focus();
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

    // --- Add the effect for fade-in sections
    React.useEffect(() => {
        const sections = document.querySelectorAll(".module-creator-container > section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((sec) => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

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

                {/* Vertical layout container */}
                <div className="module-creator-container">

                    {/* Module Settings + Header*/}
                    <section id="module-settings" aria-label="Module Settings">
                        {/*Header*/}
                        <div className="header-with-info">

                            <h1>Create Your Own Module</h1>

                            <button
                                ref={infoButtonRef}
                                onClick={() => setShowInfo(true)}
                                className="info-button"
                                aria-label="Open module information"
                                tabIndex={activeSection === "module-settings" ? 0 : -1}
                            >
                                ℹ Info
                            </button>
                        </div>

                        {/*Module Settings*/}
                        <fieldset className="module-settings">
                            <legend>
                                <span className="section-number">1</span>Module Settings
                            </legend>

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
                                tabIndex={activeSection === "module-settings" ? 0 : -1}
                            />
                            <UIInput
                                id="module-name"
                                label="Module Name"
                                value={moduleName}
                                onChange={(e) => setModuleName(e.target.value)}
                                required
                                placeholder="Enter module name"
                                size="small"
                                tabIndex={activeSection === "module-settings" ? 0 : -1}
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

                        {/* 1 → 2 */}
                        <ArrowButton
                            targetId="add-word"
                            direction="down"
                            text="Add a Word"
                            onActivateSection={(id) => setActiveSection(id)}
                            tabIndex={activeSection === "module-settings" ? 0 : -1}
                        />
                    </section>

                    {/* Add Word Section */}
                    <section id="add-word" aria-labelledby="add-word-heading">

                        {/* 2 → 1 (above 2nd section) */}
                        <ArrowButton
                            targetId="module-settings"
                            direction="up"
                            text="Module Settings"
                            onActivateSection={(id) => setActiveSection(id)}
                            tabIndex={activeSection === "add-word" ? 0 : -1}
                        />

                        <h2 id="add-word-heading" className="add-word-heading">
                            <span className="section-number">2</span>Add a Word
                        </h2>

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
                                tabIndex={activeSection === "add-word" ? 0 : -1}
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
                                    tabIndex={activeSection === "add-word" ? 0 : -1}
                                />

                                <UIInput
                                    id="translation"
                                    label="Translation"
                                    value={translation}
                                    onChange={(e) => setTranslation(e.target.value)}
                                    required
                                    placeholder="Enter translation"
                                    size="large"
                                    tabIndex={activeSection === "add-word" ? 0 : -1}
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

                        <button type="button" onClick={handleAdd} className="add-button" tabIndex={activeSection === "add-word" ? 0 : -1}>
                            <img src={PlusIcon} aria-hidden="true" />
                            Add a word
                        </button>

                        {/* 2 → 3 (below 2nd section) */}
                        <ArrowButton
                            targetId="module-preview"
                            direction="down"
                            text="Module Preview"
                            onActivateSection={(id) => setActiveSection(id)}
                            tabIndex={activeSection === "add-word" ? 0 : -1}
                        />
                    </section>

                    {/* Preview Section */}
                    <section id="module-preview" className="module-preview-section" aria-labelledby="preview-heading">
                        {/* 3 → 2 (above 3rd section) */}
                        <ArrowButton
                            targetId="add-word"
                            direction="up"
                            text="Add a Word"
                            onActivateSection={(id) => setActiveSection(id)}
                            tabIndex={activeSection === "module-preview" ? 0 : -1}
                        />


                        <h2 id="preview-heading" className="preview-heading">
                            <span className="section-number">3</span>Module Preview
                        </h2>

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
