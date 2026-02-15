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
            //For motion-sensitive users
            const prefersReducedMotion = window
                .matchMedia("(prefers-reduced-motion: reduce)")
                .matches;
            target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start", inline: "nearest" });
            onActivateSection?.(targetId);
        }
    };

    return (
        <button
            className={`arrow-button ${direction}`}
            onClick={handleActivate}     // mouse click
            tabIndex={tabIndex}
        >
            <img src={ArrowIcon} alt="" aria-hidden="true" />
            <span className="arrow-label">{text}</span>
        </button>
    );
};

export default ArrowButton;