import ArrowIcon from "../../assets/interface/arrow_section.svg";
import "./ArrowButton.css";

interface ArrowButtonProps {
    targetId: string;
    direction: "up" | "down";
    text: string; // visible section name
    onActivateSection?: (id: string) => void;
    tabIndex?: number;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ targetId, direction, text, onActivateSection, tabIndex = 0 }) => {
    const handleActivate = () => {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            onActivateSection?.(targetId);
        }
    };

    return (
        <button
            className={`arrow-button ${direction}`}
            onClick={handleActivate}     // mouse click
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { // keyboard activation
                    e.preventDefault(); // prevent space from scrolling
                    handleActivate();
                }
            }}
            tabIndex={tabIndex}
        >
            <img src={ArrowIcon} alt="" aria-hidden="true" />
            <span className="arrow-label">{text}</span>
        </button>
    );
};

export default ArrowButton;